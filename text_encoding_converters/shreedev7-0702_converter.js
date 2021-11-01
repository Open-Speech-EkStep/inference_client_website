function convert_shreedev_to_unicode(input_text_to_convert) {

    var array_one = new Array(
        //PMPML ADDITIONS
        "è", "Am¡Y", "H§y Ora", "©©", "« m", "H r", "« r", "mm", "H _obm", "§ Q", "Šg©", "Jìh©_|Q>", "o«", "H Q", "} Q", "{H$bmoñH$a", "H d", "§ n", "gmdaH$a^dZ", "Ì ~", "w §", "¥ î", "S Z", "Ao", "R m", "o Ý", "åw`", "lrm", "½`w©",
        //PMPML ADDITIONS DONE

        ">", "$", "[", "p", "“", "”",                  //06
        "µH", "™", "˜", "µJ", "µO", "µS", "µT", "µ\\",                                //08
        "ª", "£", "¤", "u", "v", "}", "]",						 			//07
        "›", "@", "&", "\"", "'",                        		                  //05
        "ú", "j", "k", "l", "Ì", "Í", "Î",                        		            //07
        "®", "¯", "é", "ê",                        		                        //04

        "#", "‚", "ƒ", "„", "†", "‡", "ˆ", "‰",                        		      //08 
        "’", "“", "”", "•", "¬", "–", "—", "œ",                        		      //08
        "³", "¶", "¸", "¹", "º", "¼", "Ã", "¾", "Å", "Æ", "Ç", "È", "É",             //13
        "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Þ", "à", "á", "ï", "ð",    //17
        "ò", "ó", "õ", "ö", "÷", "ø", "ü", "ý",                           		//08
        "ç", "Œ", "´", "«",                       		                  		//04

        "Š", "»", "½", "¿", "H", "I", "J", "K", "L",                                   //09
        "À", "Á", "Â", "Ä", "M", "N", "O", "P",                                        //08
        "Q", "R", "S", "T", "Ê", "U",                        		            	//06
        "Ë", "Ï", "Ü", "Ý", "V", "W", "X", "Y", "Z",                       	      	//09
        "ß", "â", "ã", "ä", "å", "n", "\\", "~", "^", "‘",                        		//10

        "æ", "ë", "ì", "í", "î", "ù", "û", "ñ", "ô",                               //09
        "`", "a", "b", "c", "d", "e", "f", "g", "h", "i",                        		//10

        "Am¡", "Amo", "Am°", "Am", "A", "B©", "B", "C", "D", "F", "G", "Eo", "E",           //13


        "m", "r", "s", "t", "ww", "w", "x", "y", "z", "¥", "¦", "|", "o", "¡", "¢", "…", "§§", "§", "¨", "µ", //18
        "þ", "ÿ", "°", "±", "²",                                                       		//05

        //"0","1","2","3","4","5","6","7","8","9",


        "्ा", "्ो", "्ौ", "अो", "अा", "आै", "आे", "ाो", "ाॅ", "ॅा", "ाे",
        "ंु", "ेे", "अै", "ाे", "अे", "ंा", "अॅ", "ाै", "ैा", "ंृ",
        "ँा", "ँू", "ेा", "ंे", "ाें", "ॅं", "ंॅ", " ः", "ंू")     // Remove typing mistakes in the original file

    var array_two = new Array(
        //PMPML ADDITIONS
        "ऱ्", "औंध", "कूंजीर", "©", "«m", "Hr", "«r", "आ", "कमेला", "§Q", "र्क्स", "गवर्नमेंट", "«o", "HQ", "}Q", "किर्लोस्कर", "Hd", "§n", "gmdaH$a ^dZ", "Ì~", "w§", "¥î", "SZ", "ए", "Rm", "oÝ", "å`w", "lr", "र्ग्यु",
        //PMPML ADDITIONS DONE

        "", "", "{", "{", "\"", "'",  		//06
        "क़", "ख़्", "ख़", "ग़", "ज़", "ड़", "ढ़", "फ़", // one-byte varnas           		//08
        "ं©", "ै©", "ैं©", "ी©", "ीं©", "े©", "ें©",             		//07
        "ॐ", "ऽ", "।", "‘", "’",                                			//05 
        "क्ष्", "क्ष", "ज्ञ", "श्र", "त्र", "त्र्", "त्त्",                                 	//07 
        "्रु", "्रू", "रु", "रू",   	                                      	//04 

        "ञ्च्", "ज्ज्", "च्च", "ल्ल", "ह्ण", "ह्ल", "ह्व", "्व",                             //08  
        "ङ्क", "ङ्ख", "ङ्ग", "ङ्घ", "ङ्क्ष", "ह्न", "ड्ढ", "श्व",                             	//08
        "्न", "य", "क्क", "क्व", "क्त", "ख्र", "झ्र", "ग्न", "ट्ट", "ट्ठ", "ठ्ठ", "ड्ड", "ड्ढ",     		//13
        "द्र", "दृ", "द्ग", "द्घ", "द्द", "द्ध", "द्न", "द्ब", "द्भ", "द्म", "द्य", "द्व", "न्न", "प्र", "प्त", "ष्ट", "ष्ठ",      //17 
        "स्र", "स्त्र", "ह्र", "हृ", "ह्म", "ह्य", "श्च", "श्न", 						//08
        "्य", "्र", "्र", "्र",                                          //04

        "क्", "ख्", "ग्", "घ्", "क", "ख", "ग", "घ", "ङ",                               //09 
        "च्", "ज्", "झ्", "ञ्", "च", "छ", "ज", "झ",                                   //08
        "ट", "ठ", "ड", "ढ", "ण्", "ण",                                         //06 
        "त्", "थ्", "ध्", "न्", "त", "थ", "द", "ध", "न",                                //09
        "प्", "फ्", "ब्", "भ्", "म्", "प", "फ", "ब", "भ", "म",                              //10

        "य्", "ल्", "व्", "श्", "ष्", "ळ्", "श्", "स्", "ह्",                             //09 
        "य", "र", "ल", "ल", "व", "श", "ष", "स", "ह", "ळ",                              //10

        "औ", "ओ", "ऑ", "आ", "अ", "ई", "इ", "उ", "ऊ", "ऋ", "ॠ", "ऐ", "ए",                    //13

        "ा", "ी", "ी", "ीं", "ु", "ु", "ु", "ू", "ू", "ृ", "ॄ", "ें", "े", "ै", "ैं", "ः", "ं", "ं", "ं", "़",		//18
        "ु", "ू", "ॅ", "ँ", "्",                                                       //05


        //"०","१","२","३","४","५","६","७","८","९",

        "", "े", "ै", "ओ", "आ", "औ", "ओ", "ो", "ॉ", "ॉ", "ो",
        "ुं", "े", "अ‍ै", "ो", "अ‍े", "ां", "अ‍ॅ", "ौ", "ौ", "ृं",
        "ाँ", "ूँ", "ो", "ें", "ों", "ँ", "ँ", " :", "ूं")     // Remove typing mistakes in the original file 

    //**************************************************************************************
    //
    // Punctuation marks incorporated at the end
    //
    //**************************************************************************************
    // The following two characters are to be replaced through proper checking of locations:
    //**************************************************************************************
    //   "{",
    //   "ि",
    //
    //   "©",
    //   "र्" (reph)
    // 
    //**************************************************************************************

    var array_one_length = array_one.length;

    var modified_substring = input_text_to_convert;

    Replace_Symbols();

    processed_text = modified_substring;
    // --------------------------------------------------


    function Replace_Symbols() {

        //substitute array_two elements in place of corresponding array_one elements

        if (modified_substring != "")  // if stringto be converted is non-blank then no need of any processing.
        {
            for (input_symbol_idx = 0; input_symbol_idx < array_one_length; input_symbol_idx++) {

                //  alert(" modified substring = "+modified_substring)

                //***********************************************************
                // if (input_symbol_idx==106) 
                //  { alert(" input_symbol_idx = "+input_symbol_idx);
                //    alert(" input_symbol_idx = "+input_symbol_idx)
                //; alert(" character =" + modified_substring.CharCodeAt(input_symbol_idx))
                //     alert(" character = "+modified_string.fromCharCode(input_symbol_idx)) 
                //   }
                // if (input_symbol_idx == 107) 
                //   { alert(" input_symbol_idx = "+input_symbol_idx);
                //    alert(" character = ",+string.fromCharCode(input_symbol_idx)) 
                //   }
                //***********************************************************
                idx = 0;  // index of the symbol being searched for replacement

                while (idx != -1) //while-00
                {

                    modified_substring = modified_substring.replace(array_one[input_symbol_idx], array_two[input_symbol_idx])
                    idx = modified_substring.indexOf(array_one[input_symbol_idx])

                } // end of while-00 loop
                // alert(" end of while loop")
            } // end of for loop
            // alert(" end of for loop")

            // alert(" modified substring2 = "+modified_substring)
            //*******************************************************
            var position_of_i = modified_substring.indexOf("{")

            while (position_of_i != -1)  //while-02
            {
                var charecter_next_to_i = modified_substring.charAt(position_of_i + 1)
                var charecter_to_be_replaced = "{" + charecter_next_to_i
                modified_substring = modified_substring.replace(charecter_to_be_replaced, charecter_next_to_i + "ि")
                position_of_i = modified_substring.search(/{/, position_of_i + 1) // search for i ahead of the current position.

            } // end of while-02 loop

            //**********************************************************************************
            // End of Code for Replacing four Special glyphs
            //**********************************************************************************

            // code for replacing  and correcting its position too.
            //added q to try getting in matra like भिं

            modified_substring = modified_substring.replace(/([q])([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक़ख़ग़ज़ड़ढ़फ़©])/g, "$2$1");

            modified_substring = modified_substring.replace(/([q])(्)([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक़ख़ग़ज़ड़ढ़फ़©])/g, "$2$3$1");

            modified_substring = modified_substring.replace(/([q])(्)([कखगघङचछजझञटठडड़ढढ़णतथदधनपफबभमयरलवशषसहक़ख़ग़ज़ड़ढ़फ़©])/g, "$2$3$1");

            modified_substring = modified_substring.replace(/q/g, "िं");
            // end of PMPML insert


            // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

            var position_of_wrong_ee = modified_substring.indexOf("ि्")

            while (position_of_wrong_ee != -1)  //while-03

            {
                var consonent_next_to_wrong_ee = modified_substring.charAt(position_of_wrong_ee + 2)
                var charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee
                modified_substring = modified_substring.replace(charecter_to_be_replaced, "्" + consonent_next_to_wrong_ee + "ि")
                position_of_wrong_ee = modified_substring.search(/ि्/, position_of_wrong_ee + 2) // search for 'wrong ee' ahead of the current position. 

            } // end of while-03 loop

            // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

            var position_of_wrong_ee = modified_substring.indexOf("िं्")

            while (position_of_wrong_ee != -1)  //while-03

            {
                var consonent_next_to_wrong_ee = modified_substring.charAt(position_of_wrong_ee + 3)
                var charecter_to_be_replaced = "िं्" + consonent_next_to_wrong_ee
                modified_substring = modified_substring.replace(charecter_to_be_replaced, "्" + consonent_next_to_wrong_ee + "िं")
                position_of_wrong_ee = modified_substring.search(/िं्/, position_of_wrong_ee + 3) // search for 'wrong ee' ahead of the current position. 

            } // end of while-03 loop


            // Eliminating reph "Ô" and putting 'half - r' at proper position for this.
            set_of_matras = "ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ"
            var position_of_R = modified_substring.indexOf("©")

            while (position_of_R > 0)  // while-04
            {
                probable_position_of_half_r = position_of_R - 1;
                var charecter_at_probable_position_of_half_r = modified_substring.charAt(probable_position_of_half_r)


                // trying to find non-maatra position left to current O (ie, half -r).

                while (set_of_matras.match(charecter_at_probable_position_of_half_r) != null)  // while-05

                {
                    probable_position_of_half_r = probable_position_of_half_r - 1;
                    charecter_at_probable_position_of_half_r = modified_substring.charAt(probable_position_of_half_r);

                } // end of while-05


                charecter_to_be_replaced = modified_substring.substr(probable_position_of_half_r, (position_of_R - probable_position_of_half_r));
                new_replacement_string = "र्" + charecter_to_be_replaced;
                charecter_to_be_replaced = charecter_to_be_replaced + "©";
                modified_substring = modified_substring.replace(charecter_to_be_replaced, new_replacement_string);
                position_of_R = modified_substring.indexOf("©");

            } // end of while-04

            //**********punctuation marks ****************
            //    "¡","£","¤","¥","²","³","´","µ","¹","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","Ê","Ñ","Ò","Õ",
            // "{","}","[","]","!","(",")","*","-","/",":",";","<","=",">","?","@","|",",","!","\\","√","-",

            //modified_substring = modified_substring.replace( /¡/g , "{" )   ;  

        } // end of IF  statement  meant to  supress processing of  blank  string.

    } // end of the function  Replace_Symbols

    return processed_text;
}

module.exports = {convert_shreedev_to_unicode};