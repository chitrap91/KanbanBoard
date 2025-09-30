import { useFormik } from "formik";


function CreateTask({ hideModal, handleTask, task = {} }) {


    console.log(">>>>>>>> task in create", task);

    const formik = useFormik({
        initialValues: {
            id: task.id || undefined,
            title: task.title || '',
            description: task.description || '',
            priority: task.priority || ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = 'Required';
            }
            if (!values.description) {
                errors.description = 'Required';
            }
            if (!values.priority) {
                errors.priority = 'Required';
            }
            return errors;
        },
        onSubmit: (values) => {
            // localStorage.setItem("tasks", JSON.stringify(values));
            console.log(values);
            let operation = 'update';
            if (values.id === undefined) {
                values.id = Date.now();
                operation = 'add';
            }
            const task = {
                id: values.id,
                title: values.title,
                description: values.description,
                priority: values.priority
            }
            handleTask(operation, task);
            formik.resetForm();
        }
    })


    return (

        <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="true"
            className="bg-white/30 backdrop-blur-3xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >

            <div className=" mx-auto relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add New Task
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="static-modal"
                            onClick={() => {
                                hideModal()
                            }}


                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd  "
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <form className="space-y-6" action="#" onSubmit={formik.handleSubmit}>
                            <div>

                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}

                                    id="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Task Title"
                                    required
                                />
                                <span>{formik.errors.title}</span>
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}


                                    id="description"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Description"
                                    required
                                />
                                <span>{formik.errors.description}</span>
                            </div>
                            <div>
                                <label
                                    htmlFor="Priority"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Priority
                                </label>
                                <input
                                    type="text"
                                    name="priority"
                                    value={formik.values.priority}
                                    onChange={formik.handleChange}
                                    id="priority"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Priority"
                                    required
                                />
                            </div>
                            <span>{formik.errors.priority}</span>
                            <input
                                type="submit"

                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"


                                value={" Submit "}


                            />


                        </form>
                    </div>

                </div>
            </div>
        </div>




    )
}

export default CreateTask;