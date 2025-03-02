import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import AuthLayout from '../components/layout/AuthLayout';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    // ตรงนี้คุณสามารถเพิ่มโค้ดสำหรับการส่งข้อมูลไปยัง API เพื่อลงทะเบียน
    console.log('Register data:', data);
    
    // สมมติว่าลงทะเบียนสำเร็จ นำทางไปยังหน้าล็อกอิน
    // navigate('/login');
    
    // แสดง alert เพื่อทดสอบ
    alert(`ลงทะเบียนสำเร็จด้วยอีเมล: ${data.email}`);
  };

  return (
    <AuthLayout
      title="สมัครสมาชิก"
      subtitle="กรอกข้อมูลเพื่อสร้างบัญชีใหม่"
      alternativeLink={{
        text: "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ",
        to: "/login"
      }}
    >
      <RegisterForm onSubmit={handleRegister} />
    </AuthLayout>
  );
};

export default RegisterPage;