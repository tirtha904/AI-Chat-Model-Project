// import React from 'react'
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography'
const Logo= ()=>{
    return <div
        style={{
        display:"flex",
        marginRight:"auto",
        alignItems:"center",
        gap:"8px"
    }}>
        <Link  to={"/"}>
        <img src="openai.png" alt="openai"
        width={'30px'}
        height={'30px'}
        className='image-inverted'
        />
        </Link>
         <Typography
        sx={{
            display:{md:'block', sm:'none',xs:'none'},  //medium dispLay :display block,small devices,xtra small device
            mr:'auto',
            fontWeight:'800',
            textShadow:"2px 2px 20px #000"
        }}
        >
            <span style={{fontSize:'20px'}}> AI</span>-GPT
        </Typography>

    </div>
}
export default Logo; 