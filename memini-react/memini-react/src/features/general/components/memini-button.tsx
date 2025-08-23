import "../css/memini-button.css"

const sizeClassEnums: Record<string, string>  = {
    'small': 'memini-button-small',
    'medium': 'memini-button-medium',
    'large': 'memini-button-large' 
}

const typeClassEnums: Record<string, string> = {
    'positive': 'memini-button-positive',
    'negative': 'memini-button-negative',
    'neutral': 'memini-button-neutral',
    'info': 'memini-button-info' 
}

const MeminiButton = (props: any) => { 
    const size = sizeClassEnums[props.size ?? 'medium'];
    const buttonType = typeClassEnums[props.type ?? 'neutral'];
    //const buttonClassNameDebug = `$memini-button ${size} ${buttonType}`;
    
    return (
      <>  
        <button 
        className={`memini-button ${size} ${buttonType}`}
        onClick={props.onClick}>
            {props.children}
        </button>     
      </>
    )
}

export default MeminiButton;