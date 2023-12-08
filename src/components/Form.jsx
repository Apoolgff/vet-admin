import {useState, useEffect} from 'react'
import Error from './Error'

const Form = ({ patients, setPatients, patient, setPatient}) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const [error, setError] = useState(false);

    useEffect( () => {
        if(Object.keys(patient).length>0){
            setName(patient.name)
            setOwner(patient.owner)
            setEmail(patient.email)
            setDate(patient.date)
            setSymptoms(patient.symptoms)
        }
    }, [patient])

    const idGenerator = () => {
        const random = Math.random().toString(36).substr(2);
        const dateNow = Date.now().toString(36);

        return random + dateNow
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if([name, owner, email, date, symptoms].includes('')){
            console.log('Todos los campos son obligatorios')
            setError(true);
            return;
        }
        setError(false)

        const objPatient ={
            name,
            owner,
            email,
            date,
            symptoms
        }

        if(patient.id){
            objPatient.id = patient.id

            const updatedPatients = patients.map( patientState => patientState.id ===
                patient.id ? objPatient : patientState)

            setPatients(updatedPatients)
            setPatient({})
        }else{
            objPatient.id = idGenerator();
            setPatients([...patients, objPatient]);
        }

        setName('')
        setOwner('')
        setEmail('')
        setDate('')
        setSymptoms('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 m-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Agrega pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form onSubmit={handleSubmit} className="bg-green-100 shadow-lg border-solid border-2 border-black rounded-lg py-10 px-5 mb-10">

               {error && <Error>
                <h2>Error!</h2>
                <p>Debe llenar todos los campos</p>
                </Error>}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>

                    <input id="mascota" type="text" placeholder="Nombre de la mascota" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={name} onChange={ (e) => setName(e.target.value)}/>

                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>

                    <input id="propietario" type="text" placeholder="Nombre del propietario" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={owner} onChange={ (e) => setOwner(e.target.value)}/>

                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

                    <input id="email" type="email" placeholder="Email contacto propietario" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email} onChange={ (e) => setEmail(e.target.value)}/>

                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>

                    <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={date} onChange={ (e) => setDate(e.target.value)}/>

                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>

                    <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los sintomas" 
                    value={symptoms} onChange={ (e) => setSymptoms(e.target.value)}/>
                </div>

                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                value={patient.id ? "Editar Paciente":"Agregar Paciente"} />
            </form>
        </div>
    )
}

export default Form