// if we are not working with localhost, use a relative root_url <-- consider this production
// otherwise use the IIS Express default <-- consider this development

let url = 'http://localhost:53579/' // IIS Express default

if (!window.location.href.startsWith("http://localhost")) {
  // must be a production host, use a relative root url
  url = "/"
}
console.log('environment', url)
export const ROOT_URL = url;  