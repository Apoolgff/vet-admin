import Patient from "./Patient"

const PatientList = ({ patients, setPatient, deletePatient }) => {

    return (
        <div className="md:w-1/2 lg:w-3/5 m-5 md:h-screen overflow-y-scroll">

            {patients && patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
                    <p className="text-lg mt-5 text-center mb-10">Administra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>

                    {patients.map(patient => (
                        <Patient
                            key={patient.id}
                            patient={patient}
                            setPatient={setPatient}
                            deletePatient={deletePatient}
                        />
                    ))}
                </>
            ) : <>
                <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                <p className="text-lg mt-5 text-center mb-10">Ingresa alguno para {''}
                    <span className="text-indigo-600 font-bold">mostrarlo aqui</span>
                </p>

            </>}


        </div>
    )
}

export default PatientList