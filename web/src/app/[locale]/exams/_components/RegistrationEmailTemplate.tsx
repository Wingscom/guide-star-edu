import * as React from "react";

export type RegistrationFormType = {
    full_name: string;
    email: string;
    phone: string;
    exam_type?: string;
    desired_date?: string;
    [key: string]: any;
};

export function RegistrationEmailTemplate(props: Readonly<RegistrationFormType>) {
    return (
        <div>
            <p>
                Hi GuideStarEdu, you have just received a registration request with the following
                information:
            </p>
            <p>Full Name: {props.full_name}</p>
            <p>Email: {props.email}</p>
            <p>Phone Number: {props.phone}</p>
            {props.exam_type && <p>Exam Type: {props.exam_type}</p>}
            {props.desired_date && <p>Desired Date: {props.desired_date}</p>}

            {Object.keys(props).map((key) => {
                if (["full_name", "email", "phone", "exam_type", "desired_date"].includes(key))
                    return null;
                return (
                    <p key={key}>
                        {key}: {props[key]}
                    </p>
                );
            })}
        </div>
    );
}
