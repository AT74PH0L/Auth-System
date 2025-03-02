import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import AuthLayout from '../components/layout/AuthLayout';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (data: { email: string; password: string }) => {
    // ตรงนี้คุณสามารถเพิ่มโค้ดสำหรับการส่งข้อมูลไปยัง API เพื่อล็อกอิน
    console.log('Login data:', data);
    
    // สมมติว่าล็อกอินสำเร็จ นำทางไปยังหน้าหลัก
    // navigate('/dashboard');
    
    // แสดง alert เพื่อทดสอบ
    alert(`ล็อกอินด้วยอีเมล: ${data.email}`);
  };

  return (
    <AuthLayout
      title="เข้าสู่ระบบ"
      subtitle="กรอกข้อมูลเพื่อเข้าสู่ระบบ"
      alternativeLink={{
        text: "ยังไม่มีบัญชี? สมัครสมาชิก",
        to: "/register"
      }}
    >
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
};

export default LoginPage;