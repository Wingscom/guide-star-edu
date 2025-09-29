import WrapperSignUpForm from "./_components/WrapperSignupForm";
import { getTravels } from "./action";

export default async function Travels() {
    const travels = await getTravels();
    return (
        <main>
            <WrapperSignUpForm />
        </main>
    );
}
