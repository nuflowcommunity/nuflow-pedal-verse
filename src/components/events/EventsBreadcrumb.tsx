
import React from 'react';

const EventsBreadcrumb = () => {
  return (
    <section className="bg-nuflow-sand py-3">
      <div className="container-custom">
        <nav className="text-sm text-nuflow-charcoal/70">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-nuflow-neon transition-colors">Home</a></li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span className="font-medium text-nuflow-charcoal">Eventos</span>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default EventsBreadcrumb;
