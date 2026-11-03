package com.maijiaosu.thenexusorder;

/** Bounded, non-destructive transfer of confirmed preferences between local origins. */
final class PreferenceMigration {
    private static final String LIMITS = "{\"geo_sb_w\":64,\"tno-china-v2-editor\":2097152,"
            + "\"nexus-china-warning-states-v1\":131072,\"nexus-china-enterprise-draft-v1\":131072,"
            + "\"nexus-china-enterprise-applied-v1\":131072}";
    private static final int MAX_CHARS = 2490432;

    static String readScript() {
        return "(function(){try{const limits=" + LIMITS + ";const values={};let total=0;"
                + "for(const key of Object.keys(limits)){const value=localStorage.getItem(key);"
                + "if(value===null)continue;if(typeof value!=='string'||value.length>limits[key])return {ok:false};"
                + "total+=value.length;if(total>" + MAX_CHARS + ")return {ok:false};values[key]=value;}"
                + "return {ok:true,values};}catch(error){return {ok:false};}})()";
    }

    static String writeScript(String json) {
        return "(function(){try{const values=" + json + ";const limits=" + LIMITS + ";let total=0;"
                + "if(!values||typeof values!=='object'||Array.isArray(values))return {ok:false};"
                + "for(const key of Object.keys(values)){const value=values[key];"
                + "if(!Object.prototype.hasOwnProperty.call(limits,key)||typeof value!=='string'"
                + "||value.length>limits[key])return {ok:false};total+=value.length;}"
                + "if(total>" + MAX_CHARS + ")return {ok:false};"
                + "for(const key of Object.keys(values)){if(localStorage.getItem(key)===null){"
                + "localStorage.setItem(key,values[key]);if(localStorage.getItem(key)!==values[key])return {ok:false};}}"
                + "return {ok:true};}catch(error){return {ok:false};}})()";
    }
}
