import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Form from "./components/Form"
import PatientList from "./components/PatientList"
import Footer from './components/Footer'

function App() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const getLS = () => {
      const patientsLS = JSON.parse(localStorage.getItem('patients')) ?? [];
      setPatients(patientsLS)
    }

    getLS();
  }, [])

  useEffect(()=> {
    localStorage.setItem('patients', JSON.stringify( patients ));
  }, [patients])

  const deletePatient = (id) => {
    const updatedPatients = patients.filter( patient => patient.id !== id);
    setPatients(updatedPatients)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form 
          patients = {patients}
          setPatients={setPatients}
          patient = {patient}
          setPatient = {setPatient}
        />
        <PatientList 
          patients = {patients}
          setPatient = {setPatient}
          deletePatient = {deletePatient}
        />
      </div>
      <Footer />
    </div>
  )
}

export default App
