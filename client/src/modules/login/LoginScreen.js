import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Input } from '../../components/Input';

import './login.css';

export const LoginScreen = () => {

    const [form, setForm] = useState({});
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/status").then(async (response)=>{
            
            let responseJSON = await response.json();
            
            console.log(responseJSON);

            if(!responseJSON.active) {
                setLoading(false);
            }
            else{
                setLogged(true);
            }
        });
    }, []);

    const handleOnChange = ({target})=>{        
        setForm({...form, [target.name]: target.value});
    }

    const handleLogin = async()=>{

        setLoading(true);
        console.log(JSON.stringify(form));
        const options = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let response = await fetch(
            "http://127.0.0.1:5000/login",
            options
        );
        
        setLoading(false);
        const res = await response.json();

        if(res.success) setLogged(true)
        else alert("No se pudo iniciar sesión. Asegúrese de que sus credenciales sean válidas");
    }

    return logged?<Redirect to="/home" />:loading?<h1>Cargando</h1>:(
        <div className="column-container">
            <div className="login-banner">
                <img alt="imagen UNIR" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Wu_fS0dkmzySGilebvpqfwHaB5%26pid%3DApi&f=1"/>
                <h2>Desarrollo de aplicaciones en red</h2>
                <h2>Interacción con un servidor</h2>
            </div>
            <div className="login-container">
                <form className="login-form">
                    <h3>Iniciar sesión</h3>
                    <div>
                        <Input 
                            placeholder="example@example.com"
                            name="user"
                            type="email"
                            title="Email"
                            value={form.user || ""}
                            onChange={handleOnChange}
                        />
                        <br />
                        <Input 
                            placeholder="******"
                            name="password"
                            type="password"
                            title="Contraseña"
                            value={form.password || ""}
                            onChange={handleOnChange}
                        />
                    </div>
                    <Input 
                        placeholder=""
                        name="submit"
                        type="submit"
                        title=""
                        value="Iniciar sesión"
                        callback={handleLogin}
                    />
                </form>
            </div>
        </div>
    );
}
