function convert_aakruti_to_unicode(input_text)
{
var array_one = new Array(
//"1","১",
//"2","২",
//"3","৩",
//"4","৪",
//"5","৫",
//"6","৬",
//"7","৭",
//"8","৮",
//"9","৯",
//"0","০",

//--------------------------------//
// These characters were causing issues initially. Now, those issues are fixed: Rishabh & Anirudh

"\\","ৰ",
"V","ৱ",
"Á","ন্স", 
"½","দ্দ",   
"ºô","ক্ত",
"û","",    
"£","ক্স",   
"¼ô","ক্র",

//"l…","ন্ন", // Causing Issues
"l...","ন্ন", // Fixed!!

"¼","ত্র", 
"¾","দ্ম", 

"â÷", "÷â", // Causing Issues. Ex: Sâ÷Nýïí_Q@ü\ should be প্রতিষেধকৰ but not প্িরতষেধকৰ
//--------------------------------//

"Å","ব্ধ",
"e","ঙ্",

"*×","ঞ",
"*Ø ","ঐ",
"<Ø","ঔ",
"Ô","ন্ধ্র",
">ç","ৠ",
"99","ৡ",
"9","ঌ",
"Dü","ঙ",
"É","ল্ফ",
"é","ূ",
"Ä","ব্জ",
"g.","ড়্",
"ä","ী",
//".","়",
"n","প্",
"•ý","ণ্ঠ",
"«","জ্ব",
"Üá","áÜ",

"Œ","ফ",
"Â","প্ত",
"ª","জ্জ",
"¡","ত্ব",
"›","্ব",
"ö","র",
"Ï","ক্ষ্ম",
"f","চ্",
"»","ত্থ",
"o","ব্",
"d","গ্",
"®","জ্র",
"D","ঙ",
"H","ঝ",
"ÿ","",
"ü","",
"ý","",
"ï","",
"ÿ","",
"*Ø","ঐ",

"zå×","åz×",
//"ß","Þ",
"KÙ","উ",
"#á","আ",
"<","ও",
"#","অ",
"<Ø","ঔ",
"","ধ্",
"¥","ঙ্ক",
"|","গু",
"r","শ্",
"T","ফ",
"","ং",
"Ê","শ্রী",
"s","শ্",
"Î","হ্ম",
"bÙ","ই",
"$","ঈ",
"Kù","উ",
"&","ঊ",
"*","এ",
"Ÿ","তু",
"ë","ু",
">","ঋ",
"ú","ন্দ্র",
"š","ম",
"†","্প",
"q","ল",
"‰","্ল",
"*Ø","ঐ",
"Û","ং",
"Ú","ঃ",
"à","্",
"á","া",
"ã","ী",
"å","ু",
"æ","ূ",
"ïî","î",//ৈ
"íá","ো",
//"ð","ৌ",
"ç","ৃ",
"Ü","ঁ",
"@ü","ক",
"A","খ",
"B","গ",
"C","ঘ",
"Dü","ঙ",
"E","চ",
"F","ছ",
"G","জ",
"Hü","ঝ",
"*×","ঞ",
"I","ট",
"J","ঠ",
"K","ড",
"L","ঢ",
"M","ণ",
"N","ত",
"O","থ",
"P","দ",
"Q","ধ",
"R","ন",
"S","প",
"Tü","ফ",
"U","ব",
"W","ভ",
"X","ম",
"Z","য়",
"Y","য",
"[","র",
"]","ল",
"U","ব",
"^","শ",
"_","ষ",
"a","স",
"b","হ",
"¤ü","ক্ষ",
"¬","জ্ঞ",
//"c‡","ক্ব",
"õ","্র",
"÷","্র",
//"ø","র",
"ø","্র",

"Æ","ভ্র",
"xö","ম্র",
"c…","ক্ন",
//"i…","ত্ন",
"˜","্ন",
//"…","্ন",
"°×","ঞ্চ",
"³","ঞ্জ",
"´","ঞ্ঝ",
"¶","ণ্ট",
"· ","ণ্ঠ",
"~","ণ্ড",
"Kò","ণ্ণ",
"x","ম্",
"‡","ব",
"Ç","ম্ভ",
"ü","---",
"Šß","ßŠ",
"Š","ম",
"ƒ","থ",
"„","ধ",
"k","দ্",
"‡","ব",
"w’","ন্হ",
"l","ন্",
"w","ন্",
"ó","্য",
"m","ন্",
"v","হ",
"y","স্",
//"í","ে",
"‚","ত",
"§","ঙ",
"@","ক",
"€","ক",
"Ö","ৎ",
"}","শু",
"¦","ঙ্খ",
"ì","ৃ",
"ü","",
"ñ","।",
"z×","ষ্ণ",
"¤","ক্ষ",
"’","ঽ",
"tË","ষ্ট",
"ž","iর",
"Ì","ষ্ঠ",
"t","ষ্",
"è","ু",
"¿","দ্ভ",
"º","ত্ত",
"ù","্র",

"…","ন",
"c","ক্",
"y","স্",
"i","ত্",
"l","ন্",
//"‡","ব",
"{","হু",
//"ò","়",
"  "," ",
"্্","্",
" ঁূ","ূঁ",

"ô","্ন"

) 

//**********************************************
//variables are set here. array_one_length is the variable and its value is array_one.length

//The value property sets or returns the value of the value attribute of a text field.
//The value property contains the default value OR the value a user types in (or a value set by a script).

var array_one_length = array_one.length ;
var modified_substring = input_text;	

Replace_Symbols( ) ;

var processed_text = '' ; //blank
processed_text += modified_substring;

function Replace_Symbols( )
{
//substitute array_two elements in place of corresponding array_one elements

if ( modified_substring != "" )  // if stringto be converted is non-blank then no need of any processing.
{
for ( input_symbol_idx = 0;   input_symbol_idx < array_one_length-1;    input_symbol_idx = input_symbol_idx + 2 )

{ 
//******************************************************
idx = 0  ;  // index of the symbol being searched for replacement

while (idx != -1 ) //while-00
{
modified_substring = modified_substring.replace(/ á/g, "া");
modified_substring = modified_substring.replace(/ ã/g,"ী");
modified_substring = modified_substring.replace( array_one[ input_symbol_idx ] , array_one[input_symbol_idx+1] )
idx = modified_substring.indexOf( array_one[input_symbol_idx] )

} // end of while-00 loop

} // end of for loop
/*
modified_substring = modified_substring.replace( /([ंँ])([ािीुूृेैोौ])/g , "$2$1" );

modified_substring = modified_substring.replace( /([ंँ])्र/g , "्र$1"   );

//rem changing व to क  and प to फ etc

modified_substring = modified_substring.replace( /‡([ुूृॄेैंँर्]*)Š/g , "क$1"   );

//modified_substring = modified_substring.replace( /‡/g , "क"   );
*/

/*
modified_substring = modified_substring.replace( /प([ुूृॄेैंँर्]*)§/g , "फ$1"   );

//modified_substring = modified_substring.replace( /प्र([ुूृॄेैंँ]*)§/g , "फ्र$1"   );

modified_substring = modified_substring.replace( /रं§/g , "रुं"   );

modified_substring = modified_substring.replace( /§/g , ""   );

modified_substring = modified_substring.replace( /([ुूृॄेैंँर्]*)Π/g , "़$1"   );

*/

//---------------------------------------------------------------------// 
// Some Fixes: Added by Rishabh Gaur & Anirudh
modified_substring = modified_substring.replace(/1⁄4্ন/g, "ক্র");  
modified_substring = modified_substring.replace(/ব্্ন/g, "ক্ত");    
modified_substring = modified_substring.replace(/1⁄2/g, "দ্দ");    
modified_substring = modified_substring.replace(/1⁄4/g, "ত্র");    
modified_substring = modified_substring.replace(/3⁄4/g, "দ্ম");
//---------------------------------------------------------------------// 

// following statements for adjusting postion of i maatraas.
modified_substring = modified_substring.replace(   /([â])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$1" ) ;

modified_substring = modified_substring.replace( /([â])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$3$1" ) ;
	
modified_substring = modified_substring.replace( /([â])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$3$1") ;

modified_substring = modified_substring.replace( /â/g ,  "ি" ) ;

//ৈî

modified_substring = modified_substring.replace(   /([î])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$1" ) ;

modified_substring = modified_substring.replace( /([î])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$3$1" ) ;
	
modified_substring = modified_substring.replace( /([î])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$3$1") ;


//modified_substring = modified_substring.replace( /í/g ,  "ে" ) ;

/*
modified_substring = modified_substring.replace( /([ে])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্ব])/g , "$2$1" ) ;

modified_substring = modified_substring.replace( /([ে])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্ব])/g , "$2$3$1" ) ;

modified_substring = modified_substring.replace( /([ে])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্ব])/g , "$2$3$1" ) ;
*/
modified_substring = modified_substring.replace( /([î])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$3$1" ) ;

modified_substring = modified_substring.replace( /î/g,  "ৈ");

modified_substring = modified_substring.replace( /([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])([ািীুূেৈোৌংঁৃ্]*)ò/g , "$1ò$2" ) ;

modified_substring = modified_substring.replace( /ò/g , "়" ) ;


modified_substring = modified_substring.replace( /î/g ,  "ৈ" ) ;

modified_substring = modified_substring.replace( /(í)(.*?)(ð)/g, "$2$3");

//েí

modified_substring = modified_substring.replace(   /([í])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$1" ) ;

modified_substring = modified_substring.replace( /([í])([্])([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])/g , "$2$3$1" ) ;

modified_substring = modified_substring.replace( /í/g , "ে" ) ;
modified_substring = modified_substring.replace( /ð/g , "ৌ" ) ;

//following three statement for adjusting position of reph ie, half r .


//modified_substring = modified_substring.replace( /([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বদ্ব])Þ/g , "Þ$1" ) ;

modified_substring = modified_substring.replace( /([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])([ািীুূেৈোৌংঁৃ্]*)Þ/g , "Þ$1$2" ) ;

modified_substring = modified_substring.replace( /([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বদ্বৰৱক্স])([্])Þ/g , "Þ$1$2" ) ;

modified_substring = modified_substring.replace( /([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বৰৱক্স])([ািীুূেৈোৌংঁৃ্]*)ß/g , "Þ$1$2" ) ;

//modified_substring = modified_substring.replace( /([কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযয়রলবশষসহক্ষজ্ঞঞ্চঞ্জঞ্ঝণ্টণ্ঠণ্ডণ্ণভ্রম্রক্নত্নক্ষত্রজ্ঞন্নক্বদ্ব])([্]*)ß/g , "Þ$1$2" ) ;

modified_substring = modified_substring.replace( /Þ/g , "র্" ) ;
} // end of IF  statement  meant to  supress processing of  blank  string.
} // end of the function  Replace_Symbols
return processed_text  ; 
} // end of convert_to_unicode function


//console.log(convert_aakruti_to_unicode('S÷QáRXwž ÿã Rïí\ú'))

module.exports = { convert_aakruti_to_unicode };
