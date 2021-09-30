import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

//import Emoji from "a11y-react-emoji";

const Dropdown = ({ data, setSelected, getSelected }) => {
  const [selectedItem, setSelectedItem] = useState(getSelected);
  return (
    <div className="w-full">
      <Listbox value={selectedItem} onChange={() => setSelected(selectedItem)}>
        <div className="relative mt-1">
          <Listbox.Button className="  border-0 py-2 px-3 text-left dark:bg-dbeats-dark-primary ring-dbeats-dark-secondary  ring-0   flex-1 block w-full rounded-md sm:text-sm  ">
            <span className="block truncate">{getSelected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-800"
            enterFrom="transform opacity-0  -translate-y-1/3 "
            enterTo="transform opacity-100   translate-y-0 "
            leave="transition ease-in-out duration-800"
            leaveFrom="transform opacity-100   translate-y-0"
            leaveTo="transform   opacity-0 -translate-y-1/3"
          >
            <Listbox.Options className="z-50 absolute w-full py-2 mt-1 overflow-auto text-base bg-white dark:bg-dbeats-dark-primary dark:text-gray-100 rounded-md shadow  max-h-60  focus:outline-none sm:text-sm">
              {data.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  onClick={() => setSelectedItem(person.name)}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-white bg-gradient-to-r from-green-400 to-blue-500 dark:to-dbeats-dark-secondary dark:from-dbeats-dark-alt rounded-md shadow  cursor-pointer mx-2'
                        : 'dark:text-gray-100 text-gray-900'
                    }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={selectedItem}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                      >
                        {person.name}
                        {selectedItem}
                      </span>
                      {getSelected === person.name ? (
                        <span
                          className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
export default Dropdown;
