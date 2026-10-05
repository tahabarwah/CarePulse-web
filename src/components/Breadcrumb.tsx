import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 py-3">
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 text-slate-500 hover:text-teal-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" aria-hidden="true" />
              {isLast || !item.to ? (
                <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-slate-500 hover:text-teal-700 transition-colors truncate max-w-[160px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
