import * as React from 'react';
import {Html, Head, Preview, Body, Container, Heading, Text, Link} from "@react-email/components";

interface EmailTemplateProps {
    email: string;
    subject: string;
    message: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({email, subject, message}) => {
    return (
        <Html>
            <Head>
                <Preview>Ceci est un test</Preview>
                <Body className={"bg-gray-100"}>
                    <Container className={"bg-white rounded-lg shadow-md p-6"}>
                        <Heading>Support : {subject}</Heading>
                        <Text>De la part de : {email}</Text>
                        <Text>{message}</Text>
                        <Link href={"http://localhost:3000/boutique"} className={"text-xl font-bold px-3 py-2 bg-orange-500 underline"}>Répondre au message</Link>
                    </Container>
                </Body>
            </Head>
        </Html>
    )
}

export default EmailTemplate;