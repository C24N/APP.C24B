<script setup>
    import Icon from '@idc/UI2/Vue/Decor/Icon.vue';
    import { lang } from "@idc/Config/Config.ts";
    import { defineAsyncComponent, ref, shallowRef, computed } from 'vue'
    import {MOC, MOCElement} from "@ux-ts/utils/Utils.ts";

    //
    import { useI18n } from "vue-i18n";
    const { t } = useI18n({ useScope: "global" });

    //
    import { state, layout, size } from "@idc/PreInit/GridState.ts";
    import { settings } from "@idc/PreInit/CurrentState.ts";

    //
    const fieldByType = shallowRef({
        "drop-menu": defineAsyncComponent(() => import('@idc/UI2/Vue/Input/DropMenu.vue')),
        "number": defineAsyncComponent(() => import('@idc/UI2/Vue/Input/Number.vue')),
        "switch": defineAsyncComponent(() => import('@idc/UI2/Vue/Input/Switch.vue')),
        "shape": defineAsyncComponent(() => import('@idc/UI2/Vue/Input/ShapeSelect.vue')),
        "checkbox": defineAsyncComponent(() => import('@idc/UI2/Vue/Input/Checkbox.vue')),
        "titlebar": defineAsyncComponent(() => import('@idc/UI2/Vue/Input/TitlebarSelect.vue')),
    });

    //
    const props = defineProps({
        id: { type: String, default: "#settings" },
        stateName: { type: String, default: "settings" },
        ifc: Boolean
    });

    //
    const tabs = [
        {
            id: "all",
            icon: "cog",
            label: "All",
            include: ["layout", "display", "design", "interface"]
        },
        {
            id: "grid",
            icon: "grid",
            label: "Grid",
            include: ["layout"]
        },
        {
            id: "interface",
            icon: "app-window-mac",
            label: "Interface",
            include: ["interface"]
        },
        {
            id: "display",
            icon: "monitor-cog",
            label: "Display",
            include: ["display"]
        },
        {
            id: "design",
            icon: "palette",
            label: "Design",
            include: ["design"]
        },
        {
            id: "experimental",
            icon: "flask-conical",
            label: "Experimental",
            include: ["experimental"]
        }
    ];

    //
    const currentTab = ref("all");
    const setCurrentTab = (name) => { currentTab.value = name; };

    //
    const forms = [
        {
            id: "layout",
            description: t('settings.grid_layout_desc'),
            fields: [
                {label: t('settings.columns'), icon: "columns-3", type: "number", params: [4, 6, 1], name: "columns"},
                {label: t('settings.rows'), icon: "rows-3", type: "number", params: [8, 12, 1], name: "rows"},
            ]
        },
        {
            id: "display",
            description: t('settings.display_desc'),
            fields: [
                {label: t('settings.scaling'), icon: "scaling", type: "number", params: [0.5, 1.5, 0.125], name: "scaling"},
                {label: t('settings.theme'), icon: "sun-moon", type: "switch", params: [-1, 1, 1], name: "theme"},
            ]
        },
        {
            id: "design",
            description: t('settings.design_desc'),
            fields: [
                {label: t('settings.iconShape'), icon: "badge", type: "shape", name: "iconShape"},
            ]
        },
        {
            id: "interface",
            description: t('settings.interface_desc'),
            fields: [
                {label: t('settings.titlebar'), icon: "app-window", type: "titlebar", name: "titlebar"},
            ]
        },
        {
            id: "experimental",
            description: "Experimental",
            fields: [
                {label: "Checkbox", icon: "badge-check", type: "checkbox", name: "exp-checkbox"},
                {label: "Drop-Menu", icon: "badge-check", type: "drop-menu", name: "exp-drop", menuList: {
                    menuName: "exp-drop",
                    items: {
                        "github": { icon: "github", label: "Github", value: "github" },
                        "gitlab": { icon: "gitlab", label: "Gitlab", value: "gitlab" }
                    }
                }},
            ]
        }
    ]

    //
    const getTab = (name)=>{
        return tabs.find((t)=>(t.id==name));
    }

    //
    const getForm = (name)=>{
        return forms.find((t)=>(t.id==name));
    }

    //
    const sideBar = ref(null);
    document.addEventListener("click", (ev)=>{
        if (ev.target != sideBar && !ev.target.closest(".ui-side") && !ev.target.matches(".menu-act")) {
            sideBar.value.dataset.open = false;
        }

        //
        if (MOC(ev.target, ".ui-tab") && !matchMedia("(((hover: hover) or (pointer: fine)) and ((width >= 9in) or (orientation: landscape)))").matches) {
            sideBar.value.dataset.open = false;
        }
    });

    //
    const openSidebar = ()=>{
        sideBar.value.dataset.open = !sideBar.value.dataset.open || sideBar.value.dataset.open == "false" ? true : false;
    };

    //getTab(currentTab)?.include?.map?.((id)=>getForm(id))

    //
    const availableInTab = (name, what)=>{
        return getTab(name || currentTab.value).include.indexOf(what) >= 0;
    }

    //
    const filteredForms = computed(()=>{
        return forms.filter((f)=>availableInTab(currentTab.value, f.id));
    })

</script>

<!-- -->
<template>
    <div class="ui-title-label" data-transparent scheme="dynamic-transparent">
        <Icon inert name="settings" class="ui-icon"/>
        <span>{{ "Settings" }}</span>
    </div>

    <div class="ui-screen ui-content ui-settings" :id="props.id.replace(/^\#/i,'')" v-bind="$attrs" data-scheme="solid">

        <div class="ui-nav" data-scheme="solid" data-highlight="2.5">
            <button class="menu-act hl-1 hl-2h" data-tooltip="Menu" data-scheme="solid-transparent" data-transparent data-highlight-hover="1" @click="openSidebar">
                <Icon inert slot="icon" name="menu" class="icon"/>
            </button>
            <div class="f-space"></div>
            <button class="back-act hl-1 hl-2h" data-tooltip="Back" data-scheme="solid-transparent" data-transparent data-highlight-hover="1">
                <Icon inert slot="icon" name="arrow-left" class="icon"/>
            </button>
        </div>

        <x-scrollbox class="ui-side" data-scheme="solid" data-highlight="2.5" ref="sideBar">
            <!--<div></div>-->

            <div v-for="tab in tabs"  @click="()=>setCurrentTab(tab.id)" data-highlight="2.5" :data-chroma="currentTab==tab.id ? 0.2 : 0.0" :data-scheme="currentTab==tab.id ? 'inverse' : 'solid'" :class="{'ui-selected': currentTab==tab.id}" class="ui-block-decor pe-none ui-tab" style="--decor-size: 3rem;" data-highlight-hover="3">
                <span class="tab-label">{{tab.label}}</span>
                <Icon data-place="icon" :name="tab.icon"/>
            </div>
        </x-scrollbox>

        <x-scrollbox class="ui-space">

            <div is="flex-like" data-gap="16">
                <div data-scheme="solid" data-highlight="2" v-for="form in filteredForms" data-page class="form-wrap" :key="form.id">
                    <div class="form-description">{{form.description}}</div>
                    <div v-if="form.fields" v-for="field in form.fields" :key="field.name" class="ui-block-decor pe-none" :class="{'layout-alt': field.type == 'shape' || field.type == 'titlebar'}" style="--decor-size: 4rem; will-change: contents;" >
                        <span class="opt-label" :key="field.name">{{field.label}}</span>
                        <Icon data-place="icon" :key="field.name" :name="field.icon"/>

                        <div data-place="element" :key="field.name">
                            <component
                                :key="field.name"
                                :is="fieldByType[field.type]"
                                :min="field?.params?.[0]"
                                :max="field?.params?.[1]"
                                :step="field?.params?.[2]"
                                :data-state="props.stateName"
                                :data-name="field.name"
                                :menuList="field.menuList"
                            ></component>
                        </div>
                    </div>
                </div>
            </div>

        </x-scrollbox>

    </div>
</template>
