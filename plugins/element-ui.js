import Vue from 'vue';
import {
	Container,
	Header,
	Main,
	Footer,
	Button,
	Select,
	Option,
	Row,
	Col,
	Breadcrumb,
	BreadcrumbItem,
	Tooltip,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	Tabs,
	TabPane,
	Form,
	FormItem,
	Input,
	MessageBox,
	Message,
	Dialog,
	Upload,
	Loading,
	Table,
	TableColumn,
	Switch,
	Transfer,
	Pagination,
	Tree,
	Checkbox,
	Backtop,
	Icon,
	Image,
} from 'element-ui';

export default () => {
	Vue.use(Container);
	Vue.use(Header);
	Vue.use(Main);
	Vue.use(Footer);
	Vue.use(Button);
	Vue.use(Select);
	Vue.use(Option);
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Breadcrumb);
	Vue.use(BreadcrumbItem);
	Vue.use(Tooltip);
	Vue.use(Dropdown);
	Vue.use(DropdownMenu);
	Vue.use(DropdownItem);
	Vue.use(Menu);
	Vue.use(Submenu);
	Vue.use(MenuItem);
	Vue.use(Tabs);
	Vue.use(TabPane);
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Input);
	Vue.use(Dialog);
	Vue.use(Upload);
	Vue.use(Table);
	Vue.use(TableColumn);
	Vue.use(Switch);
	Vue.use(Transfer);
	Vue.use(Pagination);
	Vue.use(Tree);
	Vue.use(Checkbox);
	Vue.use(Backtop);
	Vue.use(Icon);
	Vue.use(Image);

	Vue.use(Loading.directive);

	Vue.prototype.$confirm = MessageBox.confirm;
	Vue.prototype.$message = Message;
};
