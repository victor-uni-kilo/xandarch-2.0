/** @type {import('next').NextConfig} */
const STATIC_MEDIA_DIR = "static/media";

module.exports = {
  i18n: {
    locales: ["en-US", "sr-RS"],
    defaultLocale: "en-US",
    http: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif)/,
      use: [
        {
          loader: "file-loader",
          options: {
            limit: false,
            name: "[name].[hash:8].[ext]",
            outputPath: STATIC_MEDIA_DIR,
            publicPath: `/_next/${STATIC_MEDIA_DIR}/`,
          },
        },
      ],
    });

    return config;
  },
};
