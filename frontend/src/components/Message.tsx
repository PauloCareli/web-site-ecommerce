import React from "react";
import { Alert, AlertProps } from "react-bootstrap";

interface MessageProps {
    variant: AlertProps["variant"];
    children: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
