async function testAPI() {
    const response = await fetch("/api/test");
    const data = await response.json();
    console.log(data);
}

testAPI();
