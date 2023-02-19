import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Home = () => {
  return (
    <div>
      <BlogForm />
      <hr className="my-5" />
      <h2 className="mb-3 text-xl font-medium">Blogs</h2>
      <BlogList />
    </div>
  );
};

export default Home;
