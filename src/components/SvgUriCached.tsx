import {makeLoggers} from '@lidio601/logger';
import _ from 'lodash';
import hash from 'object-hash';
import React, {useCallback, useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import {SvgXml, UriProps} from 'react-native-svg';

const {log, loge} = makeLoggers('SvgUriCached', false);

type Props = UriProps;

export const SvgUriCached: React.FC<Props> = ({uri: REMOTE_URL, ...props}) => {
  const [data, setData] = useState<string | undefined>();

  const CACHE_KEY = hash({uri: REMOTE_URL});
  const LOCAL_URL = `${RNFS.CachesDirectoryPath}/${CACHE_KEY}.svg`;

  const _download = useCallback(() => {
    if (!REMOTE_URL) {
      return _.identity;
    }

    let jobId: number | undefined;

    RNFS.exists(LOCAL_URL)
      .then(exists => {
        if (exists) {
          log('_download :: already downloaded', {
            REMOTE_URL,
            CACHE_KEY,
            LOCAL_URL,
          });
        } else {
          log('_download :: downloading', {REMOTE_URL, CACHE_KEY, LOCAL_URL});
          const result = RNFS.downloadFile({
            fromUrl: REMOTE_URL,
            toFile: LOCAL_URL,
            background: true,
            cacheable: false,
          });
          log('_download :: download in progress', result);

          jobId = result.jobId;

          return result.promise;
        }
      })
      .then(result => {
        log('_download :: download completed', result);

        return RNFS.readFile(LOCAL_URL, 'utf8');
      })
      .then(content => {
        setData(content.substr(content.indexOf('?>') + 3));
      })
      .then(() => {
        log('_download :: file loaded');
      })
      .catch(err => {
        loge(`unable to download file from ${REMOTE_URL}`, err);
      });

    return () => {
      log('download cancelled for file', {REMOTE_URL, jobId});

      if (jobId) {
        RNFS.stopDownload(jobId);
      }
    };
  }, [REMOTE_URL]);

  useEffect(() => {
    const onUnmount = _download();

    return onUnmount;
  }, [REMOTE_URL]);

  if (!data) {
    return null;
  }

  // log('data', data);
  return <SvgXml {...props} xml={data} />;
};

export default SvgUriCached;
