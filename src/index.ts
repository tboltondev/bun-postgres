const server = Bun.serve({
    port: 10000,
    routes: {
        "/api/users": {
            POST: async req => {
                const body = await req.json();
                return Response.json({ body });
            }
        }
    }
})

console.log(`Bun version: ${Bun.version}\nServer running on port: ${server.port}`)