const marks={
star:'<path d="m60 5 13 34 37 2-29 24 9 36-30-20-30 20 9-36L10 41l37-2Z"/>',
state:'<path d="M9 35 60 7l51 28v9H9Zm6 65h90v12H15Zm7-50h13v44H22Zm31 0h14v44H53Zm31 0h13v44H84Z"/>',
party:'<path d="m60 7 12 26 29 4-22 20 6 30-25-15-25 15 6-30-22-20 29-4Z"/><path d="M15 73Q14 112 55 114v-8Q26 105 23 74Zm90 0Q106 112 65 114v-8Q94 105 97 74Z"/>',
shield:'<path d="m18 14 42-9 42 9v45q-3 32-42 54Q21 91 18 59Zm10 8v37q4 25 32 42 28-17 32-42V22L60 15Z" fill-rule="evenodd"/><path d="m60 30 8 18 22 2-17 14 6 21-19-12-19 12 6-21-17-14 22-2Z"/>',
factory:'<path d="M12 110V56l25-17v17l25-17v17l24-17v71ZM81 11h13l6 27H79Z"/><path fill="#07151c" d="M23 76h10v15H23Zm24 0h10v15H47Zm24 0h10v15H71Z"/>',
chip:'<path d="M29 29h62v62H29Zm12 12v38h38V41Z" fill-rule="evenodd"/><path d="M12 40h14v5H12Zm0 18h14v5H12Zm0 18h14v5H12Zm82-36h14v5H94Zm0 18h14v5H94Zm0 18h14v5H94ZM40 12h5v14h-5Zm18 0h5v14h-5Zm18 0h5v14h-5ZM40 94h5v14h-5Zm18 0h5v14h-5Zm18 0h5v14h-5Z"/>',
people:'<circle cx="60" cy="28" r="15"/><circle cx="24" cy="42" r="10"/><circle cx="96" cy="42" r="10"/><path d="M39 108V63q0-23 21-23t21 23v45H64V80h-8v28ZM6 94V68q0-15 17-15h10v41Zm81 0V53h10q17 0 17 15v26Z"/>',
trade:'<path d="M9 29h73V12l31 27-31 26V48H9Zm102 43H38V55L7 82l31 26V91h73Z"/>',
book:'<path d="M9 19q25-8 46 8v82q-23-13-46-8Zm56 8q21-16 46-8v82q-23-5-46 8Z"/><path d="M19 36 45 43m-26 9 26 7m-26 9 26 7m30-32 26-7m-26 23 26-7m-26 23 26-7" fill="none" stroke="#07151c" stroke-width="3"/>',
energy:'<path d="m61 5-37 57h28l-7 53 45-69H63Z"/>',
port:'<path d="M7 102h106v9H7ZM55 10h9v83h-9ZM18 29h86v9H18ZM20 38h5v37h-5ZM89 38h5v37h-5ZM38 51h44v6H38ZM9 80h36v13H9Zm67 0h36v13H76Z"/>',
justice:'<path d="M57 10h7v94h-7ZM17 31h86v6H17ZM29 35h4v30h-4ZM90 35h4v30h-4ZM8 67h45q-22 36-45 0Zm60 0h45q-22 36-45 0ZM27 105h66v8H27Z"/>',
rail:'<path d="M31 7h58v77H31ZM17 112l31-38h10l-29 38Zm74 0L62 74h10l31 38Z"/><path fill="#07151c" d="M39 17h42v24H39Zm2 41h12v12H41Zm26 0h12v12H67Z"/>',
health:'<path d="M45 12h30v33h33v30H75v33H45V75H12V45h33Z"/>'};
function mark(n){return '<svg aria-hidden="true" viewBox="0 0 120 120" class="mark">'+(marks[n]||marks.state)+'</svg>'}
function photo(file,label){return `<figure class="photo"><img src="assets/${file}" alt="${label}"><figcaption>${label}</figcaption></figure>`}
function fileButton(label,id){return `<button data-file="${id}">${label}</button>`}
function wire(){return '<svg class="wires" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true"><path d="M300 24V70H100V115M300 70H500V115M300 70V115M100 170V207H300V250M500 170V207H300M300 170V250"/></svg>'}
