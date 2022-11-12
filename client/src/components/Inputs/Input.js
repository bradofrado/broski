import "./inputs.css";

export default function Input({onChange, className, children, ...props}) {
    const _className = 'input ' + (className || '');

    const input = <input className={_className} {...props} onChange={(e) => onChange(e.target.value)}/>

    if (children) {
        return <span className={_className}>
            {children}
            <input className={(className + ' no-border')} {...props} onChange={(e) => onChange(e.target.value)}/>
        </span>
    }

    return input;
}