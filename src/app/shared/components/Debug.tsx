export default function Debug() {
    return (
        <div style={{ display: "none" }}>
            <p>{process.env.NEXT_PUBLIC_BASE_PATH}</p>
            <p>{process.env.API_URL}</p>
            <p>{process.env.FRONTEND_URL}</p>
        </div>
    )
}