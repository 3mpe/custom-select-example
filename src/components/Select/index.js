import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

const Select = ({ opened = false, options: initialOptions, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState(initialOptions ?? []);
  const [filteredOptions, setFilteredOptions] = useState(initialOptions ?? []);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(opened);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
      const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filteredOptions);

      return;
    }
    setFilteredOptions(options);
  }, [searchText, options]);

  // Ctrl + A ile tüm item'ları seçme
  useEffect(() => {
    const handleSelectAll = (e) => {
      if (!dropdownOpen) return;

      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        if (selectedItems.length === options.length) {
          setSelectedItems([]);
          onChange([]);
        } else {
          setSelectedItems(options);
          onChange(options);
        }
      }
    };

    document.addEventListener("keydown", handleSelectAll);
    return () => document.removeEventListener("keydown", handleSelectAll);
  }, [options, selectedItems, onChange, dropdownOpen]);

  // input içine item ekleme veya silme işlemi için
  const handleSelection = useCallback(
    (option) => {
      const updatedSelection = selectedItems.includes(option)
        ? selectedItems.filter((i) => i !== option)
        : [...selectedItems, option];

      setSelectedItems(updatedSelection);
      onChange(updatedSelection);
    },
    [onChange, selectedItems]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Yeni bir entry ekleme işlemi için.
  const addNewItem = useCallback(() => {
    if (!options.includes(searchText)) {
      const updatedOptions = [...options, searchText];
      setOptions(updatedOptions);
      handleSelection(searchText);
      setSearchText("");
    }
  }, [handleSelection, options, searchText]);

  // memorized components
  const memorizedSearchInput = useMemo(
    () => (
      <div
        className="flex flex-wrap items-center border border-gray-300 rounded px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500"
        onClick={() => {
          inputRef.current.focus();
          setDropdownOpen(true);
        }}
      >
        {/* Selected Items */}
        {selectedItems.map((item) => (
          <div
            key={item}
            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-1 truncate max-w-[w-96]"
          >
            {item}
            <button
              className="ml-2 text-white hover:text-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                handleSelection(item);
              }}
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </div>
        ))}

        {/* Input Field */}
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-grow px-2 py-1 outline-none"
          placeholder="Search or add..."
          aria-label="Search or add items"
        />
      </div>
    ),
    [handleSelection, searchText, selectedItems]
  );

  const memorizedFilteredOptions = useMemo(() => {
    if (!dropdownOpen) return null;

    return (
      filteredOptions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute w-full bg-white border border-gray-300 mt-2 max-h-40 overflow-y-auto z-10 rounded shadow-lg truncate max-w-[w-96]"
          role="listbox"
        >
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                option.toLowerCase().includes(searchText.toLowerCase())
                  ? "bg-blue-100"
                  : ""
              }`}
              onClick={() => handleSelection(option)}
              role="option"
              aria-selected={selectedItems.includes(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )
    );
  }, [
    filteredOptions,
    handleSelection,
    searchText,
    selectedItems,
    dropdownOpen,
  ]);

  const memorizedAddNewItem = useMemo(() => {
    return (
      searchText &&
      !filteredOptions.length && (
        <button
          className="right-2 top-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition w-full mt-2 truncate max-w-[w-96]"
          onClick={addNewItem}
          aria-label={`Add new item: ${searchText}`}
        >
          Add "{searchText}"
        </button>
      )
    );
  }, [addNewItem, filteredOptions.length, searchText]);

  return (
    <div className="relative w-96 m-4">
      {/* Input with Selected Items */}
      {memorizedSearchInput}

      {/* Add New Item Button */}
      {memorizedAddNewItem}

      {/* Dropdown Options */}
      {memorizedFilteredOptions}


      {/* HTML İçinde Yapılan Özellikler: */}
      <div className="mt-4">
        <ul>
          <li>1. <strong>Dropdown Menüsü:</strong> Kullanıcı input alanına tıkladığında dropdown menüsü açılır. (Focus olayına bağlı)</li>
          <li>2. <strong>Dışarıya Tıklanma:</strong> Kullanıcı, dropdown menüsü veya input dışına tıkladığında dropdown kapanır. (mousedown eventi ile dinleniyor)</li>
          <li>3. <strong>Yeni Item Ekleme:</strong> Arama kutusuna yazılan ve mevcut seçenekler arasında bulunmayan bir seçenek eklenebilir. (Yeni item, arama kutusunun alt kısmında "Add" butonu ile eklenir)</li>
          <li>4. <strong>Tüm Seçenekleri Seçme:</strong> Kullanıcı Ctrl + A tuşlarına basarak tüm seçenekleri seçebilir veya seçimlerini kaldırabilir. (Ctrl + A eventi ile tetiklenir) (Not: sadece dropdown açıkken Ctrl + A durumu çalışacaktır.)</li>
          <li>5. <strong>Seçilen Elemanlar:</strong> Seçilen elemanlar, input alanında küçük etiketler olarak görünür. Kullanıcı bu etiketleri tıklayarak seçimden çıkarabilir.</li>
          <li>6. <strong>Otomatik Filtreleme:</strong> Kullanıcı arama kutusuna yazdıkça, seçenekler filtrelenir ve yalnızca eşleşen öğeler gösterilir.</li>
        </ul>
      </div>
    </div>
  );
};

export default Select;
