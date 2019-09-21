 async function testAsync() {
     return `hello world`
 }


 async function test() {
     const v1 = await getSomeThing();
     const v2 = await testAsync();
 }
 //  await: async wait
 const result = testAsync();
 console.log(result) //返回的是一个Promise对象