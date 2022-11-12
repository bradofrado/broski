import "./inputs.css";

export default function Input({onChange, className, ...props}) {
    return <input className={'input ' + (className || '')} {...props} onChange={(e) => onChange(e.target.value)}/>
}