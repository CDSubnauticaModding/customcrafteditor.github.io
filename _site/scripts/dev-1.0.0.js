function parseString(input) {
      var output = "";
      var input_array = input.split("");

      var canceled = false;
      var input_mode = 0; // 1 = Added : 2 = Modified : 3 = Alias
      var openBrackets = 0;

      var addedRecipes = [];
      var modifiedRecipes = [];
      var aliasRecipes = [];

      var currentFieldCheck = "";
      var currentFieldGetValueNow = false;
      var currentFieldValue = "";
      var currentInnerField = "";
      var currentInnerFieldGetValueNow = false;
      var currentInnerFieldValue = "";
      var currentlineComment = false;

      var currentObject;
      var currentIngredient;

      input_array.forEach((c,i) => {
            if (!canceled) {
                  if (c !== "#" && !currentlineComment) {
                        if (input_mode !== 1 && input_mode !== 2 && input_mode !== 3) {
                              if (c == " " || c == "\n") {
      
                              } else if (c == ":") {
                                    if (currentFieldCheck == "AddedRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";
                                          
                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 1;
                                    } else if (currentFieldCheck == "ModifiedRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";
                                          
                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 2;
                                    } else if (currentFieldCheck == "AliasRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";
                                          
                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 3;
                                    } else {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";
                                          
                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          output += "CANCELED";
                                          canceled = true;
                                    }
                              } else {
                                    currentFieldCheck += c;
                              }
                        } else {
                              if (openBrackets == 0) {
                                    if (c == " " || c == "\n") {

                                    } else if (c == "(") {
                                          currentObject = new Recipe("",0,[],[],true,true,[],"","","");
                                          openBrackets ++;
                                    } else {

                                    }
                              } else if (openBrackets == 1 || openBrackets == 2) {
                                    if (openBrackets == 1 && c == ")") {
                                          openBrackets --;
                                          if (input_mode == 1) {
                                                addedRecipes.push(currentObject);
                                          } else if (input_mode == 2) {
                                                modifiedRecipes.push(currentObject);
                                          } else if (input_mode == 3) {
                                                aliasRecipes.push(currentObject);
                                          }
                                          currentObject = null;
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";
                                          
                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                    } else {
                                          if (currentFieldCheck == "") {
                                                if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                      if (c == ":" || c == ";") {

                                                      }
                                                } else {
                                                      currentFieldCheck += c;
                                                }
                                          } else {
                                                if (!currentFieldGetValueNow) {
                                                      if (c == " " || c == "\n") {
                                                            currentFieldCheck = "";
                                                            currentFieldGetValueNow = false;
                                                            currentFieldValue = "";
                                                            
                                                            currentInnerField = "";
                                                            currentInnerFieldGetValueNow = false;
                                                            currentInnerFieldValue = "";
                                                      } else if (c == ";") {
                                                            currentFieldCheck = "";
                                                            currentFieldGetValueNow = false;
                                                            currentFieldValue = "";
                                                            
                                                            currentInnerField = "";
                                                            currentInnerFieldGetValueNow = false;
                                                            currentInnerFieldValue = "";
                                                      } else if (c == ":") {
                                                            if (currentFieldCheck == "ItemID" || currentFieldCheck == "DisplayName" || currentFieldCheck == "Tooltip" || currentFieldCheck == "AmountCrafted" || currentFieldCheck == "Ingredients" || currentFieldCheck == "LinkedItemIDs" || currentFieldCheck == "Unlocks" || currentFieldCheck == "Path" || currentFieldCheck == "ForceUnlockAtStart") {
                                                                  currentFieldGetValueNow = true;
                                                            } else {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (currentFieldValue === "") {
                                                            if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                  if (c == ";") {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  if (currentFieldCheck == "Ingredients") {
                                                                        currentFieldValue = [];
                                                                        if (c == " " || c == "\n") {
                                                                              
                                                                        } else if (c == "(") {
                                                                              openBrackets ++;
                                                                              currentIngredient = new Ingredient("",0);
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentIngredient = null;
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentIngredient = null;
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else if (currentFieldCheck == "LinkedItemIDs" || currentFieldCheck == "Unlocks") {
                                                                        currentFieldValue = [];
                                                                        if (c == "\"") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentIngredient = null;
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == ",") {
                                                                              if  (currentInnerField == "") {

                                                                              } else {
                                                                                    currentFieldValue.push(currentInnerField);
                                                                                    currentInnerField = "";
                                                                              }
                                                                        } else {
                                                                              currentInnerField += c;
                                                                        }
                                                                  } else if (currentFieldCheck == "DisplayName" || currentFieldCheck == "Tooltip") {
                                                                        currentFieldValue = "";
                                                                        if (c == "\"") {
                                                                              
                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            }
                                                      } else {
                                                            if (currentFieldCheck == "Ingredients") {
                                                                  if (openBrackets == 2) {
                                                                        if (currentInnerField == "") {
                                                                              if (c == ")") {
                                                                                    currentFieldValue.push(currentIngredient);
                                                                                    
                                                                                    currentIngredient = null;
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                                    openBrackets --;
                                                                              } else if (c == " " || c == "\n") {

                                                                              } else if (c == ";" || c == ":") {
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              } else {
                                                                                    currentInnerField += c;
                                                                              }
                                                                        } else {
                                                                              if (!currentInnerFieldGetValueNow) {
                                                                                    if (c == ")") {
                                                                                          if (currentInnerField !== "" && currentInnerFieldValue !== "") {
                                                                                                if (currentInnerField == "ItemID") {
                                                                                                      currentIngredient.id = currentInnerFieldValue;
                                                                                                } else if (currentInnerField == "Required") {
                                                                                                      currentIngredient.amount = currentInnerFieldValue;
                                                                                                }
                                                                                          }
                                                                                          currentFieldValue.push(currentIngredient);
                                                                                          
                                                                                          currentIngredient = null;
                                                                                          currentInnerField = "";
                                                                                          currentInnerFieldGetValueNow = false;
                                                                                          currentInnerFieldValue = "";
                                                                                          openBrackets--;
                                                                                    } else if (c == " " || c == "\n") {
                                                                                          currentInnerField = "";
                                                                                          currentInnerFieldGetValueNow = false;
                                                                                          currentInnerFieldValue = "";
                                                                                    } else if (c == ";") {
                                                                                          currentInnerField = "";
                                                                                          currentInnerFieldGetValueNow = false;
                                                                                          currentInnerFieldValue = "";
                                                                                    } else if (c == ":") {
                                                                                          if (currentInnerField == "ItemID" || currentInnerField == "Required") {
                                                                                                currentInnerFieldGetValueNow = true;
                                                                                          } else {
                                                                                                
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                          }
                                                                                    }else {
                                                                                          currentInnerField += c;
                                                                                    }
                                                                              } else {
                                                                                    if (currentInnerFieldValue === "") {
                                                                                          if (c == ")") {
                                                                                                currentFieldValue.push(currentIngredient);
                                                                                                
                                                                                                currentIngredient = null;
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                                openBrackets--;
                                                                                          } else if (c == " ") {
                                                                                                
                                                                                          } else if (c == "\n") {
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                          } else if (c == ";") {
                                                                                                if (currentInnerField == "ItemID" || currentInnerField == "Required") {
                                                                                                      if (currentInnerField == "ItemID") {
                                                                                                            currentIngredient.id = currentInnerFieldValue;
                                                                                                      } else if (currentInnerField == "Required") {
                                                                                                            currentIngredient.amount = currentInnerFieldValue;
                                                                                                      }
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                } else {
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                }
                                                                                          } else if (c == ":") {
                                                                                                
                                                                                          }else {
                                                                                                currentInnerFieldValue += c;
                                                                                          }
                                                                                    } else {
                                                                                          if (c == ")") {
                                                                                                if (currentInnerField != "" && currentInnerFieldValue != "") {
                                                                                                      if (currentInnerField == "ItemID") {
                                                                                                            currentIngredient.id = currentInnerFieldValue;
                                                                                                      } else if (currentInnerField == "Required") {
                                                                                                            currentIngredient.amount = currentInnerFieldValue;
                                                                                                      }
                                                                                                }
                                                                                                currentFieldValue.push(currentFieldValue);

                                                                                                currentIngredient = null;
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                                openBrackets--;
                                                                                          } else if (c == " " || c == "\n") {
                                                                                                if (currentInnerField != "" && currentInnerFieldValue != "") {
                                                                                                      if (currentInnerField == "ItemID") {
                                                                                                            currentIngredient.id = currentInnerFieldValue;
                                                                                                      } else if (currentInnerField == "Required") {
                                                                                                            currentIngredient.amount = currentInnerFieldValue;
                                                                                                      }
                                                                                                }
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                          } else if (c == ";") {
                                                                                                if (currentInnerField == "ItemID" || currentInnerField == "Required") {
                                                                                                      if (currentInnerField == "ItemID") {
                                                                                                            currentIngredient.id = currentInnerFieldValue;
                                                                                                      } else if (currentInnerField == "Required") {
                                                                                                            currentIngredient.amount = currentInnerFieldValue;
                                                                                                      }
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                } else {
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                }
                                                                                          } else if (c == ":") {
                                                                                                
                                                                                          }else {
                                                                                                currentInnerFieldValue += c;
                                                                                          }
                                                                                    }
                                                                              }
                                                                        }
                                                                  } else if (openBrackets == 1) {
                                                                        if (c == " " || c == "\n") {
                                                                              
                                                                        } else if (c == "(") {
                                                                              openBrackets ++;
                                                                              currentIngredient = new Ingredient("",0);
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == ";") {
                                                                              currentObject.ingredients = currentFieldValue;
                                                                              currentIngredient = null;
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == ",") {

                                                                        } else {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else if (currentFieldCheck == "LinkedItemIDs" || currentFieldCheck == "Unlocks") {
                                                                  if (c == " " || c == "\n") {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else if (c == ";") {
                                                                        if (currentInnerField != "") {
                                                                              currentFieldValue.push(currentInnerField);
                                                                        }
                                                                        if (currentFieldCheck == "LinkedItemIDs") {
                                                                              currentObject.linkeditems = currentFieldValue;
                                                                        } else if (currentFieldCheck == "Unlocks") {
                                                                              currentObject.unlocks = currentFieldValue;
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else if (c == "\"") {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else if (c == ",") {
                                                                        if  (currentInnerField == "") {

                                                                        } else {
                                                                              currentFieldValue.push(currentInnerField);
                                                                              currentInnerField = "";
                                                                        }
                                                                  } else {
                                                                        currentInnerField += c;
                                                                  }
                                                            } else if (currentFieldCheck == "DisplayName" || currentFieldCheck == "Tooltip") {
                                                                  if (c == ";") {
                                                                        if (currentFieldCheck == "DisplayName") {
                                                                              currentObject.displayname = currentFieldValue;
                                                                        } else if (currentFieldCheck == "Tooltip") {
                                                                              currentObject.tooltip = currentFieldValue;
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else if (c == "\"") {
                                                                        
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            } else {
                                                                  if (c == " " || c == "\n" || c == "," || c == ";") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "ItemID") {
                                                                                    currentObject.id = currentFieldValue;
                                                                              } else if (currentFieldCheck == "AmountCrafted") {
                                                                                    currentObject.amount = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Path") {
                                                                                    currentObject.path = currentFieldValue;
                                                                              } else if (currentFieldCheck == "ForceUnlockAtStart") {
                                                                                    if (currentFieldValue == "true") {
                                                                                          currentObject.forceunlockdefault = false;
                                                                                          currentObject.forceunlock = true;
                                                                                    } else if (currentFieldValue == "false") {
                                                                                          currentObject.forceunlockdefault = false;
                                                                                          currentObject.forceunlock = false;
                                                                                    }
                                                                              }
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    }
                              } else {

                              }
                        }
                  } else {
                        if (c === "#") {
                              currentlineComment = true;
                        } else if (c === "\n") {
                              currentlineComment = false;
                        } else {
                              
                        }
                  }
            }
      });

      if (input_mode == 1) {
            var __o = new RecipeData(addedRecipes,1);
            return __o;
      } else if (input_mode == 2) {
            var __o = new RecipeData(modifiedRecipes,2);
            return __o;
      } else if (input_mode == 3) {
            var __o = new RecipeData(aliasRecipes,3);
            return __o;
      } else {
            var __o = new RecipeData([],0);
            return __o;
      }
}

function toCString(idata,imode) {

      var data;
      var mode;

      if (imode === undefined) {
            data = idata.data;
            mode = idata.mode;
      } else {
            data = idata;
            mode = imode;
      }

      var output = "";

      if (mode === 1) {
            var addedcount = data.length;
            data.forEach((v,i) => {
                  if (i === 0) {
                        output += "AddedRecipes: (" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  if (v.amount >= 0) {
                        output += tab + "AmountCrafted: " + v.amount + ";" + newline;
                  }
                  var ingredientscount = v.ingredients.length;
                  v.ingredients.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "Ingredients: " + newline + tab + "(" + newline;
                        } else {
                              output += "," + newline + tab + "(" + newline;
                        }
                        output += tab + tab + "ItemID: " + vv.id + ";" + newline;
                        output += tab + tab + "Required: " + vv.amount + ";" + newline;
                        output += tab + ")";
                        if (ii+1 >= ingredientscount) {
                              output += ";"+newline;
                        }
                  });
                  var linkeditemscount = v.linkeditems.length;
                  v.linkeditems.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "LinkedItemIDs: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii+1 >= linkeditemscount) {
                              output += ";" + newline;
                        }
                  });
                  var unlocksitemscount = v.unlocks.length;
                  v.unlocks.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "Unlocks: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii+1 >= unlocksitemscount) {
                              output += ";" + newline;
                        }
                  });
                  if (v.path !== "") {
                        output += tab + "Path: " + v.path + ";" + newline;
                  }
                  if (v.forceunlockdefault !== true) {
                        output += tab + "ForceUnlockAtStart: " + v.forceunlock + ";" + newline;
                  }
                  output += ")";
                  if (i+1 >= addedcount) {
                        output += ";" + newline;
                  }
            });
      }


      if (mode === 2) {
            var modifiedcount = data.length;
            data.forEach((v,i) => {
                  if (i === 0) {
                        output += "ModifiedRecipes: (" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  if (v.amount >= 0) {
                        output += tab + "AmountCrafted: " + v.amount + ";" + newline;
                  }
                  var ingredientscount = v.ingredients.length;
                  v.ingredients.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "Ingredients: " + newline + tab + "(" + newline;
                        } else {
                              output += "," + newline + tab + "(" + newline;
                        }
                        output += tab + tab + "ItemID: " + vv.id + ";" + newline;
                        output += tab + tab + "Required: " + vv.amount + ";" + newline;
                        output += tab + ")";
                        if (ii+1 >= ingredientscount) {
                              output += ";"+newline;
                        }
                  });
                  var linkeditemscount = v.linkeditems.length;
                  v.linkeditems.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "LinkedItemIDs: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii+1 >= linkeditemscount) {
                              output += ";" + newline;
                        }
                  });
                  var unlocksitemscount = v.unlocks.length;
                  v.unlocks.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "Unlocks: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii+1 >= unlocksitemscount) {
                              output += ";" + newline;
                        }
                  });
                  if (v.forceunlockdefault !== true) {
                        output += tab + "ForceUnlockAtStart: " + v.forceunlock + ";" + newline;
                  }
                  output += ")";
                  if (i+1 >= modifiedcount) {
                        output += ";" + newline;
                  }
            });
      }

      
      if (mode === 3) {
            var aliascount = data.length;
            data.forEach((v,i) => {
                  if (i === 0) {
                        output += "AliasRecipes: (" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  if (v.displayname !== "") {
                        output += tab + "DisplayName: " + "\"" + v.displayname + "\"" + ";" + newline;
                  }
                  if (v.tooltip !== "") {
                        output += tab + "Tooltip: " + "\"" + v.tooltip + "\"" + ";" + newline;
                  }
                  if (v.amount >= 0) {
                        output += tab + "AmountCrafted: " + v.amount + ";" + newline;
                  }
                  var ingredientscount = v.ingredients.length;
                  v.ingredients.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "Ingredients: " + newline + tab + "(" + newline;
                        } else {
                              output += "," + newline + tab + "(" + newline;
                        }
                        output += tab + tab + "ItemID: " + vv.id + ";" + newline;
                        output += tab + tab + "Required: " + vv.amount + ";" + newline;
                        output += tab + ")";
                        if (ii+1 >= ingredientscount) {
                              output += ";"+newline;
                        }
                  });
                  var linkeditemscount = v.linkeditems.length;
                  v.linkeditems.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "LinkedItemIDs: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii+1 >= linkeditemscount) {
                              output += ";" + newline;
                        }
                  });
                  var unlocksitemscount = v.unlocks.length;
                  v.unlocks.forEach((vv,ii) => {
                        if (ii === 0) {
                              output += tab + "Unlocks: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii+1 >= unlocksitemscount) {
                              output += ";" + newline;
                        }
                  });
                  if (v.path !== "") {
                        output += tab + "Path: " + v.path + ";" + newline;
                  }
                  if (v.forceunlockdefault !== true) {
                        output += tab + "ForceUnlockAtStart: " + v.forceunlock + ";" + newline;
                  }
                  output += ")";
                  if (i+1 >= aliascount) {
                        output += ";" + newline;
                  }
            });
      }


      return output;
}


const newline = "\n";
const tab = "    ";

// CLASSES

class RecipeData {
      constructor(data,mode) {
            this.data = data;
            this.mode = mode;
      }
}

class Recipe {
      constructor(id,amount,ingredients,linkeditems,forceunlock,forceunlockdefault,unlocks,path,displayname,tooltip) {
            this.id = id;
            this.amount = amount;
            this.ingredients = ingredients;
            this.linkeditems = linkeditems;
            this.forceunlock = forceunlock;
            this.forceunlockdefault = forceunlockdefault;
            this.unlocks = unlocks; // MODIFIED END
            this.path = path; // ADDED END
            this.displayname = displayname;
            this.tooltip = tooltip; // ALIAS END
      }
}

class Ingredient {
      constructor(id,amount) {
            this.id = id;
            this.amount = amount;
      }
}