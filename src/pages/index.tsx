import { useAppSelector } from "../hooks"

export default function HomePage() {
    const { appName } = useAppSelector(state => state.app);
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <p className="text-[24px] text-zinc-700">Welcome to {appName}</p>
            <span className="text-zinc-500 text-[18px]">Home page</span>
        </div>
    )
}