"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schemas/login";
import { storeUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userLogin] = useUserLoginMutation();
    const router = useRouter()
    const { reset } = useForm();
    type FormValues = {
        email: string;
        password: string
    }

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        try {
            const res = await userLogin({ ...data }).unwrap();
            if (res?.accessToken) {
                router.push("/dashboard");

            } else {
                setErrorMessage("Login failed. Please try again.");
            }

            storeUserInfo({ accessToken: res?.accessToken });
            reset();

        } catch (err: any) {
            reset();
            console.error(err.message);
            setErrorMessage("Login failed. Please try again.");
        }
    };
    return (
        <div className="grid grid-cols-2 gap-4">
            <section className="bg-blue-300">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-dark">
                                Sign In
                            </h1>
                            {errorMessage && (
                                <div className="text-red-600 bg-red-100 p-2 rounded-lg">
                                    {errorMessage}
                                </div>
                            )}
                            <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
                                <div>
                                    <FormInput
                                        name="email"
                                        type="text"
                                        size="large"
                                        label="User Id"
                                        required
                                    />
                                </div>
                                <div
                                    style={{
                                        margin: "15px 0px",
                                    }}
                                >
                                    <FormInput
                                        name="password"
                                        type="password"
                                        size="large"
                                        label="User Password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full text-dark bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log In</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>

            <div></div>
        </div>

    );
};

export default SignIn;