import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export const NotFound = () => {
  return (
    <div className="elite-bg flex min-h-screen items-center justify-center px-4 py-8 text-white">
      <div className="elite-panel w-full max-w-md rounded-[1.5rem] p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2d06b]">404</p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">Page Not Found</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          This route does not exist yet or may have moved.
        </p>
        <Button
          render={<Link to="/" />}
          className="elite-btn-gold mt-6 h-12 w-full rounded-2xl text-sm font-bold uppercase tracking-[0.16em]"
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};
