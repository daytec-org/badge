import React from 'https://esm.sh/react@18.2.0'

import { stringToHexColor } from '../utils/hexColor.ts'
import { ENV } from '@/config'

const { API_URL } = ENV

export interface OptionItem {
  id: number;
  label: string;
};

export interface SelectProps {
  name: string;
  placeholder?: string;
  defaultValue?: number;
  options: OptionItem[];
  reset?: boolean;
  multiple?: boolean;
  searchEnable?: boolean;
  defaultCheckedAll?: boolean;
  className?: string;
  colored?: boolean;
  onClick?: (id: number, title: string) => void;
  onChange?: (value: number[]) => void;
};

const caretIcon = `${API_URL}/img/caret-down.svg`;
const searchIcon = `${API_URL}/img/search.svg`;
const loc = {
  search: 'Search',
  nothing: 'Found nothing',
};

export const Select = ({
  name,
  placeholder,
  defaultValue,
  options,
  reset,
  multiple,
  defaultCheckedAll,
  searchEnable = false,
  className,
  colored,
  onClick,
  onChange,
}: SelectProps) => {
  const [filteredOptions, setFilteredOptions] = React.useState<OptionItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState<string>('');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [checkedState, setCheckedState] = React.useState<number[]>([]);
  const componentRef = React.useRef<HTMLDivElement>(null);
  const searchFieldRef = React.useRef<HTMLInputElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpen(prev => !prev);
  };

  const searchFocus = () => {
    if (open && searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (open && searchEnable) {
      e.stopPropagation();
      e.preventDefault();
      searchFocus();
    }
  };

  React.useEffect(searchFocus, [open]);

  React.useEffect(() => {
    if (multiple && defaultValue && options) {
      setCheckedState([defaultValue]);
    }

    const setClosed = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element) || !componentRef.current) return;
      if (e.target !== componentRef.current && !componentRef.current.contains(e.target)) setOpen(false);
    };

    document.body.addEventListener('click', setClosed);
    return () => document.body.removeEventListener('click', setClosed);
  }, []);

  React.useEffect(() => {
    setResult(options?.find(item => item.id === defaultValue)?.label ?? '');
  }, [defaultValue]);

  React.useEffect(() => {
    if (options) {
      if (searchValue) {
        const regExp = new RegExp(searchValue.toUpperCase());
        setFilteredOptions(options.filter(item => item.label.toUpperCase().match(regExp)));
      } else {
        setFilteredOptions(options);
      }
    }
  }, [options]);

  React.useEffect(() => {
    if (reset) {
      setSearchValue('');
      setResult(options?.find(item => item.id === defaultValue)?.label ?? '');
      setCheckedState([]);
    }
  }, [reset]);

  React.useEffect(() => {
    if (multiple && defaultCheckedAll && options) {
      const checkedAllId: number[] = [];
      options.forEach(option => checkedAllId.push(option.id));
      setCheckedState(checkedAllId);
    }
  }, [defaultCheckedAll]);

  const handleChange = (id: number) => {
    const newCheckedState = checkedState.includes(id)
      ? checkedState.filter(item => item !== id)
      : [...checkedState, id];
    setCheckedState(newCheckedState);
    if (onChange) onChange(newCheckedState);
  };

  const handleSearchInput: React.FormEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget;
    setSearchValue(value);
    if (value.length > 1) {
      const regExp = new RegExp(value.toUpperCase());
      setFilteredOptions(options.filter(item => item.label.toUpperCase().match(regExp)));
    } else {
      setFilteredOptions(options);
    }
  };

  const handleOptionClick = (e: React.MouseEvent, data: OptionItem) => {
    e.preventDefault();
    e.stopPropagation();
    setResult(data.label);
    setOpen(false);
    if (onClick) onClick(data.id, data.label);
  };

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    const newCheckedState = checkedState.filter(item => item !== id);
    setCheckedState(newCheckedState);

    if (onChange) onChange(newCheckedState);
  };

  const getOptions = () => {
    if (!filteredOptions.length) {
      return <li className="select__options_nothing">{loc.nothing}</li>;
    }

    if (multiple) {
      return filteredOptions?.map(el => {
        const color = colored ? { backgroundColor: stringToHexColor(el.label) } : undefined;

        return (
          <li key={el.id}>
            <label className="select__options_item" onClick={e => e.stopPropagation()}>
              <input
                type="checkbox"
                value={el.label}
                checked={checkedState.includes(el.id)}
                onChange={() => handleChange(el.id)}
              />
              {color && <span style={color} />}
              {el.label}
            </label>
          </li>
        );
      });
    }

    return filteredOptions?.map(el => {
      const color = colored ? { backgroundColor: stringToHexColor(el.label) } : undefined;

      return (
        <li key={el.id} className="select__options_item" onClick={e => handleOptionClick(e, el)}>
          {color && <span style={color} />}
          {el.label}
        </li>
      );
    });
  };

  const getResultMultiple = () =>
    checkedState.map(id => {
      const title = options.find(el => el.id === id)?.label ?? 'null';
      const color = colored ? { backgroundColor: `${stringToHexColor(title)}80` } : undefined;

      return (
        <div key={id} className="select__multiple_item" style={color}>
          {title}
          <button type="button" onClick={e => handleRemove(e, id)} className="select__multiple_item_delete" />
        </div>
      );
    });

  return (
    <div className={className ? `select ${className}` : "select"} ref={componentRef} onClick={handleOpen}>
      <div className="select__field">
        {searchEnable && open && (
          <input
            ref={searchFieldRef}
            className="select__search"
            autoComplete="off"
            onInput={handleSearchInput}
            onClick={e => e.stopPropagation()}
            value={searchValue}
            aria-placeholder={placeholder}
          />
        )}
        {!multiple && (
          <input className="select__value" name={name} value={result} readOnly aria-placeholder={placeholder} />
        )}
        {multiple && !open && (
          <div className="select__multiple" aria-placeholder={placeholder}>
            {getResultMultiple()}
          </div>
        )}
        {placeholder && (
          <div
            className={
              result === '' && !checkedState.length
                ? "select__placeholder"
                : `select__placeholder select__placeholder_shift`
            }
          >
            {placeholder}
          </div>
        )}
      </div>
      <div
        className={
          open && !searchEnable ? `select__caret select__caret_rotate` : "select__caret"
        }
        onClick={handleSearchClick}
      >
        <img src={open && searchEnable ? searchIcon : caretIcon} alt={open && searchEnable ? 'search' : 'caret'} />
      </div>
      <ul className={open ? `select__options_open scroll` : "select__options_closed"}>{getOptions()}</ul>
    </div>
  );
};
