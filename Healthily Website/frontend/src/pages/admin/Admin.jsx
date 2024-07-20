import Container from "../../components/Container";
import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/navbar/Navbar";

const Admin = ({ user }) => {
  return (
    <>
      <div className="flex flex-col h-screen bg-[#f5f6f7]">
        <Navbar user={user} logoColor={"text-black"} />
        <Container
          OrgComp={
            <>
              <Dashboard role={user?.role} />
            </>
          }
        />
        <footer>Footer</footer>
      </div>
    </>
  );
};
export default Admin;
