export default function NodeView({ node }){
    return(
        <div>
            <p>{node.value}</p>
            {node.children.length > 0 && (
                <>
                <h4>Children:</h4>
                <div style={{ display: "flex", gap: "10px" }}>
                    {node.children.map((child, index) => (
                    <NodeView key={index} node={child} />
                    ))}
                </div>
                </>
            )}
        </div>
    )
}