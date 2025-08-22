// 1: Exporting nested objects and function from Module using exports Object.

module.exports = {
    utils: {
        calculate:{
            add: (a,b) => a+b,
            sub: (a,b) => a-b,
        }
    },
    hello: function (name) {
  return `Good Morning, ${name}`;
}
}