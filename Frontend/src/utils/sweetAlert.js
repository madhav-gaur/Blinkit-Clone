import Swal from 'sweetalert2'

const successAlert = (title) => {
  const alert = Swal.fire({
    title,
    icon: "success",
    confirmButtonColor: 'var(--secondary)'
  });
  return alert
};

export default successAlert
