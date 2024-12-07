/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import './node2.css'
export default function NodeView({ treeData }) {
    if (!treeData || !treeData.children || !treeData.children.length) {
        return null; // No children to render
    }

    return (
        <ul>
            {treeData.children.map((item, index) => (
                <li key={index}>
                    <div className='node'>{item.value}</div>
                    {item.children && item.children.length > 0 && (
                        <NodeView treeData={item} />
                    )}
                </li>
            ))}
        </ul>
    );
}
