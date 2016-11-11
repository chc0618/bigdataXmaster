package cn.edu.tju.bigdata.controller.app.service.resource;

import cn.edu.tju.bigdata.annotation.SystemLog;
import cn.edu.tju.bigdata.controller.index.BaseController;
import cn.edu.tju.bigdata.entity.MeetupFormMap;
import cn.edu.tju.bigdata.entity.MemberFormMap;
import cn.edu.tju.bigdata.enums.EmDeletedMark;
import cn.edu.tju.bigdata.mapper.MeetupMapper;
import cn.edu.tju.bigdata.mapper.MemberMapper;
import cn.edu.tju.bigdata.plugin.PageView;
import cn.edu.tju.bigdata.util.Common;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Random;
import java.util.Set;

/**
 * Created by Ethan on 2016/10/7.
 */
@Controller
@RequestMapping("/member")
public class MemberController extends BaseController {

    @Autowired
    private MemberMapper memberMapper;
    
    @Autowired
    private MeetupMapper meetupMapper;

    @ResponseBody
    @RequestMapping("/{number}/list")
    public List<MemberFormMap> getMemberByNumber (@PathVariable String number) {
        List<MemberFormMap> list = null;
        MemberFormMap formMap = new MemberFormMap();
        formMap.put("where", String.format("where deleted_mark = %d and number = '%s'", EmDeletedMark.VALID.getCode(), number));
        list = memberMapper.findByWhere(formMap);
        return list;
    }
    
    @RequestMapping("/toMemberSearch")
    public String toMemberSearch(Model model) {
        model.addAttribute("res", findByRes());
        return Common.BACKGROUND_PATH + "/app/member/list";
    }
    
    @ResponseBody
    @RequestMapping("/findByPage")
    public PageView findByPage(String pageNow, String pageSize) {
        MemberFormMap memberFormMap = getFormMap(MemberFormMap.class);
        memberFormMap = toFormMap(memberFormMap, pageNow, pageSize, memberFormMap.getStr("orderby"));
        memberFormMap.set("deleted_mark", EmDeletedMark.VALID.getCode());
        List<MemberFormMap> list = memberMapper.findByPage(memberFormMap);
        pageView.setRecords(list);
        return pageView;
    }

    @RequestMapping("/toRelationViewPage")
    public String toRelationViewPage(Model model) {
        String id = getPara("id");
		if (Common.isNotEmpty(id)) {
			model.addAttribute("id",id);
		}
        return Common.BACKGROUND_PATH + "/app/member/viewRelation";
    }
    
    @ResponseBody
    @RequestMapping("/getRelation")
    public String getRelation() throws Exception {
    	String id = getPara("id");
    	System.out.println(id);
    	List<Map<String,String>> list = new ArrayList<Map<String,String>>();
    	
    	MemberFormMap member = memberMapper.findbyFrist("id", id, MemberFormMap.class);
    	String targetName = (String) member.get("name");
		String meetup = (String) member.get("meetup");
		List<MemberFormMap> members = memberMapper.findByAttribute("meetup", meetup, MemberFormMap.class);
		
		Random r = new Random();
		JSONArray MenberArray = new JSONArray();
		for(MemberFormMap t : members){
			Map<String,String> map = new HashMap<String,String>();
			if(t.get("id").toString().equals(id)){
				map.put("category", "0");
				map.put("name", (String) t.get("name"));
				map.put("value", "10");
			}
			else{
				map.put("category", (r.nextInt(2) + 1)+"");
				map.put("name", (String) t.get("name"));
				map.put("value", (r.nextInt(5) + 1)+"");
			}
			JSONObject json = JSONObject.fromObject(map);
			MenberArray.add(json);
		}
    	JSONArray relationArray = new JSONArray();

		for(MemberFormMap t : members){
			Map<String,String> map = new HashMap<String,String>();
	    	map.put("source", (String) t.get("name"));
	    	map.put("target", targetName);
	    	map.put("weight", (r.nextInt(5) + 1)+"");
	    	map.put("name", "某种关系");
	    	JSONObject json = JSONObject.fromObject(map);
	    	relationArray.add(json);
		}
		JSONObject json = new JSONObject();
		json.put("members", MenberArray);
		json.put("relations", relationArray);
    	
        return json.toString();
    }
}
