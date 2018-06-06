public static String httpGet(String url, String charset)
throws HttpException, IOException {
String json = null;
HttpGet httpGet = new HttpGet();
// 设置参数
try {
httpGet.setURI(new URI(url));
} catch (URISyntaxException e) {
throw new HttpException("请求url格式错误。"+e.getMessage());
}
// 发送请求
HttpResponse httpResponse = client.execute(httpGet);
// 获取返回的数据
HttpEntity entity = httpResponse.getEntity();
byte[] body = EntityUtils.toByteArray(entity);
StatusLine sL = httpResponse.getStatusLine();
int statusCode = sL.getStatusCode();
if (statusCode == 200) {
json = new String(body, charset);
entity.consumeContent();
} else {
throw new HttpException("statusCode="+statusCode);
}
return json;
}
