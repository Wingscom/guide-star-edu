export default function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{
                width: "48px",
                height: "48px",
                border: "5px solid #ddd",
                borderTop: "5px solid #000",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
            }} />
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
