// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  name: "local",
  localUrl: "http://104.211.245.48:8080/SFCS-WebApp/sfcs/",
  domain: "http://104.211.245.48:8080/",
  uri: "http://10.0.49.153",
  blob:
    "https://sfcsblobstorageeastus2.file.core.windows.net/bt-scanneddocumentfs/",
  SAS:
    "?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2022-12- 31T15:43:42Z&st=2019-07-01T07:43:42Z&spr=https&sig=LYDTRWHSsbnUH4XfhjSHrQ1wzFa1iuFdFxDwRprZCyE%3D",
};
