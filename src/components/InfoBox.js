import React from 'react';
import {
  Box,
  Text,
  Paragraph,
  Anchor,
  TextArea,
  ResponsiveContext,
} from 'grommet';
// import { StatusInfo, StatusGood, StatusWarning } from 'grommet-icons';
import QRCode from 'qrcode.react';
import styled from 'styled-components';

import Status from './Status';
import inject from './inject';

const InfoBox = ({ status, statusWP, statusPosts, statusDemo, demoUrl }) =>
  status !== 'idle' && (
    <Box
      gap="large"
      pad="40px"
      round="xsmall"
      elevation="small"
      background="white"
      animation={{ type: 'fadeIn', duration: 300 }}
    >
      {status !== 'error' ? (
        <Box align="start" gap="small">
          <Status
            name="Connecting with your WordPress site"
            status={statusWP}
          />
          <Status name="Collecting latest posts" status={statusPosts} />
          <Status name="Generating your live demo" status={statusDemo} />
        </Box>
      ) : (
        <Status name="Oops! Something went wrong" status="error" />
      )}
      {status !== 'error' ? (
        <Opacity value={status === 'ok' ? 1 : 0.2}>
          <ResponsiveContext.Consumer>
            {breakpoint =>
              breakpoint === 'small' ? (
                <Box align="center" gap="medium">
                  <Text textAlign="center" size="16px">
                    <Anchor color="brand" href={demoUrl}>
                      Click here
                    </Anchor>{' '}
                    to view this demo on your mobile phone.
                  </Text>
                </Box>
              ) : (
                <Box align="center" gap="medium">
                  <Box width="128px" height="128px">
                    <QRCode value={demoUrl || 'DEMO'} />
                  </Box>
                  <Box fill="horizontal">
                    <TextArea
                      fill
                      value={demoUrl}
                      resize={false}
                      fontSize="11px"
                    />
                  </Box>
                  <Text textAlign="center" size="16px">
                    <strong>Scan QR code</strong> or{' '}
                    <strong>copy and paste this URL</strong> on your{' '}
                    <strong>mobile browser</strong> to view this demo on your
                    mobile phone.
                  </Text>
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        </Opacity>
      ) : (
        <Box gap="medium">
          <Paragraph size="small" margin={{ vertical: '0' }}>
            We haven't been able to generate your demo, we will get back to you
            by <strong>email</strong> shortly
          </Paragraph>
          <Paragraph size="small" margin={{ vertical: '0' }}>
            Make sure your WordPress is a <strong>blog</strong> or{' '}
            <strong>news</strong> site. We only support sites using posts/pages.
          </Paragraph>
          <Paragraph size="small" margin={{ vertical: '0' }}>
            In the meantime, you can visit{' '}
            <Anchor href="https://blog.frontity.com">
              https://blog.frontity.com
            </Anchor>{' '}
            from a mobile phone to see our PWA theme in action.
          </Paragraph>
        </Box>
      )}
    </Box>
  );

export default inject(
  ({ store }) => ({
    status: store.status,
    statusWP: store.statusList.get('isWordPress'),
    statusPosts: store.statusList.get('hasPosts'),
    statusDemo: store.status,
    demoUrl: store.demoUrl,
  }),
  InfoBox,
);

const Opacity = styled.div`
  opacity: ${({ value = 1 }) => value};
`;
