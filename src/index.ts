import {
    AdminCreateUserCommand,
    AdminCreateUserCommandInput,
    CognitoIdentityProviderClient
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

type User = {
    email: string;
    password: string;
    username: string;
}

const server = Bun.serve({
    port: 10000,
    routes: {
        "/api/users": {
            POST: async req => {
                const body = (await req.json());
                const user = body.user as User;

                const input: AdminCreateUserCommandInput = {
                    UserPoolId: process.env.AWS_USER_POOL_ID,
                    Username: user.username,
                    UserAttributes: [
                        { Name: "email", Value: user.email },
                    ]
                }

                const command = new AdminCreateUserCommand(input);

                try {
                    await cognitoClient.send(command);

                    return new Response("Created", { status: 201 });
                } catch (error) {
                    console.error(error);
                    return Response.error();
                }
            }
        }
    }
})

console.log(`Bun version: ${Bun.version}\nServer running on port: ${server.port}`)
