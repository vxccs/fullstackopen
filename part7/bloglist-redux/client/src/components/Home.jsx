import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Home = () => {
  return (
    <>
      <BlogForm />

      <h2>blogs</h2>
      <BlogList />
    </>
  );
};

export default Home;
