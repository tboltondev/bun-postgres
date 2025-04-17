const server = Bun.serve({
    port: 10000,
    routes: {
        "/hello/:name": (req) => new Response(`hello ${req.params.name}`),
    }
})

console.log(`Server running on port: ${server.port}`)