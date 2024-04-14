import convertLeafKeysToCamelCase from 'src/utils/typography/convertLeafKeysToCamelCase'

const RAW_TYPOGRAPHY =
  // text style
  {
    'heading-09': {
      'font-size': '40px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.30000001192092896px',
      'line-height': '52px',
    },
    'heading-08': {
      'font-size': '36px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '46px',
    },
    'heading-07': {
      'font-size': '32px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '42px',
    },
    'heading-06': {
      'font-size': '28px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '38px',
    },
    'heading-05': {
      'font-size': '24px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '34px',
    },
    'heading-04': {
      'font-size': '20px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '28px',
    },
    'heading-03': {
      'font-size': '16px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '22px',
    },
    'heading-02': {
      'font-size': '14px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '20px',
    },
    'heading-01': {
      'font-size': '12px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '18px',
    },
    'heading-00': {
      'font-size': '11px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '18px',
    },
    'body-03-m': {
      'font-size': '16px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 500,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '24px',
    },
    'body-03-long-r': {
      'font-size': '16px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 700,
      'letter-spacing': '0.0015000000596046448em',
    },
    'body-03-r': {
      'font-size': '16px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '24px',
    },
    'body-02-m': {
      'font-size': '14px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 500,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '20px',
    },
    'body-02-long-r': {
      'font-size': '14px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '24px',
    },
    'body-02-r': {
      'font-size': '14px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '20px',
    },
    'body-01-m': {
      'font-size': '12px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 500,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '18px',
    },
    'body-01-long-r': {
      'font-size': '12px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '20px',
    },
    'body-01-r': {
      'font-size': '12px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.0030000001192092896em',
      'line-height': '18px',
    },
    'detail-02-m': {
      'font-size': '11px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 500,
      'letter-spacing': '-0.30000001192092896px',
      'line-height': '18px',
    },
    'detail-02-r': {
      'font-size': '11px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.30000001192092896px',
      'line-height': '18px',
    },
    'detail-01-m': {
      'font-size': '10px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 500,
      'letter-spacing': '-0.30000001192092896px',
      'line-height': '18px',
    },
    'detail-01-r': {
      'font-size': '10px',
      'font-family': 'Spoqa Han Sans Neo',
      'font-weight': 400,
      'letter-spacing': '-0.30000001192092896px',
      'line-height': '18px',
    },
    'shadow-card-01': {
      'box-shadow': '0px 2px 8px rgba(0, 0, 0, 0.1), 0px 8px 20px rgba(0, 0, 0, 0.1)',
    },
    'shadow-card-02': {
      'box-shadow': '2px 2px 10px rgba(0, 0, 0, 0), 2px 2px 20px rgba(0, 0, 0, 0.1)',
    },
    'shadow-tab-02': {
      'box-shadow': '0px 0px 4px rgba(0, 0, 0, 0.1), 2px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    'shadow-profile': {
      'box-shadow': '0px 0px 1px rgba(0, 0, 0, 0.3)',
    },
    'shadow-tooltip': {
      'box-shadow': '2px 6px 12px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1)',
    },
    'shadow-float': {
      'box-shadow': '4px 8px 28px rgba(0, 0, 0, 0.1), 0px 4px 12px rgba(0, 0, 0, 0.2)',
    },
  }

const TYPOGRAPHY = convertLeafKeysToCamelCase(RAW_TYPOGRAPHY)

export default TYPOGRAPHY
