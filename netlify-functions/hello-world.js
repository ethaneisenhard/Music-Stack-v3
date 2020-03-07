exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Cache-Control": "no-cache",
         "Content-Type": "text/html"
      },
      body: JSON.stringify({ msg: "hello, world" })
    };
  }